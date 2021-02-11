const TASK_KEY = "task"
const PROFILE_KEY = 'profile';
const MARK_KEY = 'mark';

async function GetLocalStorageData(key) {
    return await new Promise((resolve, reject) => {
        if (localStorage.getItem(key)) {
            resolve(JSON.parse(localStorage.getItem(key)))
        } else {
            reject("Error")
        }
    })
}
var userid;
var datatabel
async function setUserId() {
    await GetLocalStorageData(PROFILE_KEY).then(data => {
        userid = data.id
        console.log("user id >>", userid);
        GetUserTaskData(TASK_KEY).then(data => {
            datatabel = data
        })
    })
}
setUserId()

async function GetUserTaskData(key) {
    return await new Promise((resolve, reject) => {
        if (localStorage.getItem(key)) {
            resolve(JSON.parse(localStorage.getItem(key)).filter(ele => ele.u_id == userid))
        } else {
            reject("Task empty")
        }
    })
}

function getStatus(status) {
    if (status == 1) {
        return "Panding"
    }
    if (status == 2) {
        return "Complited"
    }
    if (status == 3) {
        return "Reject"
    }
}
function setTableFormate() {
    var pendingTask = datatabel.filter(ele => ele.status == 1)
    var ComplitedData = datatabel.filter(ele => ele.status == 2)
    //<td>${getStatus(ele.status)}</td>

    //let Complited = "<th>Mark</th><th>Title</th><th>Description</th><th>Start At</th><th>End At</th><th>Action</th>"
    let Complited = ""
    let pending = ""
    //let design = "<>Title</><th>Description</th><th>Start At</th><th>End At</th><th>Status</th><th>Action</th>"
    pendingTask.map(ele => {
        let start = ''
        if (GetMark(ele.u_id, ele.id)) {
            start = `<button onclick="removeMark(${ele.u_id},${ele.id})">⭐</button>`
        } else {
            start = `<button onclick="saveToMark(${ele.u_id},${ele.id})">➕</button>`
        }
        pending += `<div class="col">
        <div class="card card-table">
            <div class="card-header">
                <div class="avtar">${start}</div>
            </div>
            <div class="card-content">
                <div class="card-field">
                    <h2> ${ele.title}</h2>
                </div>
                <div class="card-field">
                    <span class="card-span">Description : </span>
                    <span class="desc">${ele.desc}</span>
                </div>
                <div class="card-field"><span>Starting Date : </span>${ele.stdate}</div>
                <div class="card-field"> <span>Ending Date : </span>${ele.enddate}</div>
                <div class="action-btn">
                    <div class='btnEdit' onclick='RedirectToUpdate(${ele.id})'>Edit</div>
                    <div class='btnDel' onclick='deleteTask(${ele.id})'>Delete</div>
                </div>
            </div>
        </div>
    </div>`
    })
    ComplitedData.map(ele => {
        if (GetMark(ele.u_id, ele.id)) {
            start = `<button onclick="removeMark(${ele.u_id},${ele.id})">⭐</button>`
        } else {
            start = `<button onclick="saveToMark(${ele.u_id},${ele.id})">➕</button>`

        }
        Complited += `<div class="col">
        <div class="card card-table">
            <div class="card-header">
                <div class="avtar">${start}</div>
            </div>
            <div class="card-content">
                <div class="card-field">
                    <h2> ${ele.title}</h2>
                </div>
                <div class="card-field">
                    <span class="card-span">Description : </span>
                    <span class="desc">${ele.desc}</span>
                </div>
                <div class="card-field"><span>Starting Date : </span>${ele.stdate}</div>
                <div class="card-field"> <span>Ending Date : </span>${ele.enddate}</div>
                <div class="action-btn">
                    <div class='btnEdit' onclick='RedirectToUpdate(${ele.id})'>Edit</div>
                    <div class='btnDel' onclick='deleteTask(${ele.id})'>Delete</div>
                </div>
            </div>
        </div>
    </div>`
    })
    //datatabel += "</table>"
    document.getElementById('tablepanding').innerHTML = pending
    document.getElementById('tablecomplit').innerHTML = Complited
}
function LoginAuth() {
    if (localStorage.getItem(PROFILE_KEY)) {
        window.location.href = '../dashboard.html'
    } else {
        window.location.href = '../login.html'
    }
}

function deleteTask(id) {
    let index = datatabel.map(id => { return id.id }).indexOf(id);
    datatabel.splice(index, 1)
    console.log(datatabel);
    localStorage.setItem(TASK_KEY, JSON.stringify(datatabel))
    window.location.reload();
}


function logout() {
    localStorage.removeItem(PROFILE_KEY)
    LoginAuth()
}

function RedirectToUpdate(id) {
    window.location.href = `../updatetask.html?id=${id}`
}

function GetMark(userId, taskId) {
    let arr = [0]
    if (localStorage.getItem(MARK_KEY) && JSON.parse(localStorage.getItem(MARK_KEY))[userId]) {
        arr = JSON.parse(localStorage.getItem(MARK_KEY))[userId]
        console.log(arr.includes(taskId));
        return arr.includes(taskId)
    } else {
        return false
    }
}

function saveToMark(userid, id) {
    let arr = []
    if (localStorage.getItem(MARK_KEY)) {
        arr = JSON.parse(localStorage.getItem(MARK_KEY))[userid]
        arr.push(id)
        localStorage.setItem(MARK_KEY, JSON.stringify({ [userid]: arr }))
        window.location.reload();

    } else {
        arr.push(id)
        localStorage.setItem(MARK_KEY, JSON.stringify({ [userid]: arr }))
        window.location.reload();
    }
}

function removeMark(userid, id) {
    let arr = []
    if (localStorage.getItem(MARK_KEY)) {
        arr = JSON.parse(localStorage.getItem(MARK_KEY))[userid]
        let index = arr.indexOf(id)
        arr.splice(index, 1)
        localStorage.setItem(MARK_KEY, JSON.stringify({ [userid]: arr }))
        window.location.reload();

    }
}

function timer() {
    setInterval(() => {
        var d = new Date();
        var n = d.toLocaleTimeString();
        document.getElementById("timer").innerHTML = n
    }, 1000);
}