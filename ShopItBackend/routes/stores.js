const express = require('express');
const router = express.Router();

let Store = require('../models/store.model');
let Item = require('../models/item.model');

const csv = require("csvtojson");
const fs = require('fs')

var jwt = require('jsonwebtoken');
var secret_key = "C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c"

// Returns all grocery stores
router.route('/').get((req, res) => {
    Store.find()
        .then(stores => res.json(stores))
        .catch(err => res.status(400).json(err));
});

// Returns grocery store given lat and long
router.route('/at').get((req, res) => {
    const { lat, long }  = req.query;

    if (!lat || !long) res.status(400).json('Lat and/or long not in query params');

    Store.findOne({long: { $eq : long }, lat: { $eq : lat }})
        .then(store => {
            if (store) res.json(store)
            else res.status(404).json(`Could not find store at ${lat}, ${long}`)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.use('/:username', function (req, res, next) {

    let token = req.cookies.jwt;

    if (token == null) {
      res.status(401).json('401 error: Could not authenticate');
    } else {
        jwt.verify(token, secret_key, function(err, decoded) {
          if(err != null || decoded == null)
          {
            res.status(401).json('401 error: Could not authenticate');
          } else {
            req.jwt_usr = decoded.usr
            console.log("authenticated!")
            next()
          }
      });
    }
})

// add grocery store


router.route('/:username').post( async (req,res) => {

    let csvFilePath = ""
    let floorPlanPath = ""
    try {
        let username = req.params.username;
        csvFilePath = req.files['items'][0].path
        floorPlanPath = req.files['floorPlan'][0].path
        req.jwt_usr = username
        if (req.jwt_usr != username) {
            res.status(401).json('Error: User is not authenticated');
            fs.unlink(csvFilePath, (err) => {
                if (err) {
                    console.error(err)
                }
            })
            fs.unlink(floorPlanPath, (err) => {
                if (err) {
                    console.error(err)
                }
            })
        } else {
            let asyncUpdate = new Promise(async function(resolve, reject){
                try {
                    jsonArray = await csv().fromFile(csvFilePath);
                    resolve(jsonArray);
                } catch (error) {
                    reject("Error: could not parse json");
                }
            })

            asyncUpdate.then(function(jsonArray) {
                const { name, long, lat } = req.body;

                validItems = []
                invalidItems = []

                for(let i = 0; i < jsonArray.length; i++) {
                    let item = new Item(jsonArray[i]); 
                    let error = item.validateSync(); 
                    if(error == null) {
                        validItems.push(item)
                    } else {
                        invalidItems.push(item)
                    }
                };

                const newStore = new Store({
                    name: name,
                    long: long,
                    lat: lat,
                    items: validItems
                });

                newStore.save()
                .then(store => res.json(`Store (${store._id}) has been added! Items added: ${store.items}. Items that could not be added: ${invalidItems}`))
                .catch(err => res.status(400).json("Error: could not save store: " + err));
            })
            .catch(function(val) {
                res.status(400).json("Error: Could not create store because: " + val);
            })
            .finally(function() {
                fs.unlink(csvFilePath, (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
                fs.unlink(floorPlanPath, (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            })
        }
    } catch(error) {
        res.status(500).json("Internal Server Error: Could not open files")
        fs.unlink(csvFilePath, (err) => {
            if (err) {
                console.error(err)
            }
        })
        fs.unlink(floorPlanPath, (err) => {
            if (err) {
                console.error(err)
            }
        })
    }
})

// Delete grocery store
router.route('/:username').delete(async (req, res) => {

    let username = req.params.username;
    req.jwt_usr = username

    if(req.jwt_usr != username) {
        res.status(401).json('Error: User is not authenticated');
    } else {
        const storeId = req.body.storeId;

        Store.findByIdAndDelete(storeId)
            .then(store => res.json(`Store (${store._id}) has been deleted!`))
            .catch(err => res.status(404).json(err));
    }
});


module.exports = router;
