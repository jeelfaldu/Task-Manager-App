const PROFILE_KEY = 'profile';
const DATABASE_KEY = 'database';

function LoginAuth() {
    if (localStorage.getItem(PROFILE_KEY)) {
        window.location.href = '../dashboard.html'
    } else {
        window.location.href = '../login.html'
    }
}
function saveDataToStore(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
async function GetDataBase() {
    return await new Promise((resolve, reject) => {
        if (localStorage.getItem(DATABASE_KEY)) {
            resolve(JSON.parse(localStorage.getItem(DATABASE_KEY)))
        } else {
            reject("Database can not deffind")
        }
    })
}


function signup(name, email, mobile, gender, dob, pass) {
    //Name, email, mobile, gender, dob, password
    console.log(gender);
    let obj = {
        name: name,
        email: email,
        number: mobile,
        gender: gender,
        dob: dob,
        pass: pass
    }
    let DATABASE = []
    GetDataBase()
        .then((data) => {
            console.log(data);
            DATABASE = data
            if (data.some(ele => ele.email == obj.email)) {
                alert("Email already exist");
            } else {
                obj.id = DATABASE.length
                DATABASE.push(obj)
                localStorage.setItem(DATABASE_KEY, JSON.stringify(DATABASE))
                alert("Sucessfully register");
                window.location.href = "./index.html"
            }
        }).catch(err => {
            obj.id = DATABASE.length
            DATABASE.push(obj)
            localStorage.setItem(DATABASE_KEY, JSON.stringify(DATABASE))
        })
}



function userLogin(email, password) {
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var numberRegex = /^\d{10}$/
    GetDataBase()
        .then(result => {
            console.log(result);
            let data = [];
            if (emailRegex.test(email)) {
                data = result.filter(ele => (ele.email == email && ele.pass == password))
                console.log(data);
                if (data.length == 1) {
                    saveDataToStore(PROFILE_KEY, data[0])
                    LoginAuth()
                } else {
                    alert('Somthing went wrong');
                }
            } else if (numberRegex.test(email)) {
                data = result.filter(ele => (ele.number == email && ele.pass == password))
                console.log(data);
                if (data.length == 1) {
                    saveDataToStore(PROFILE_KEY, data[0])
                    LoginAuth()
                } else {
                    alert('Somthing went wrong');
                }

            } else {
                alert("User Not found!!")
            }
            //console.log(data);

        })
}
function setMassage(msg) {
    document.getElementById('msg').innerHTML = msg
}


//let database = [{ name: "abvd", email: "email", pass: "pass" }]
//localStorage.setItem("database", JSON.stringify(database)) //array store in database
//let data = JSON.parse(localStorage.getItem('database')) //get data from data base and parse  
//console.log(data);
//let newOBJ = { name: "abvd", email: "email", pass: "pass" }  // new object
//data.push(newOBJ) // push in data array 
//localStorage.setItem("database", JSON.stringify(data)) // setitem


