var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

var db = new sqlite3.Database('LINE.db')

app.get('/', function (req, res, next) {
    var query = "\
        SELECT t.post_content,t.post_datetime,u.user_name\
        FROM timeline t,\
             (SELECT friend.friend_id\
              FROM friend\
              WHERE id1=1) f,\
             user u\
        WHERE t.post_id = f.friend_id and t.post_id=u.id1\
        ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

