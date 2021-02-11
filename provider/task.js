const TASK_KEY = "task"
const PROFILE_KEY = 'profile';

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
async function setUserId() {
    await GetLocalStorageData(PROFILE_KEY).then(data => {
        userid = data.id
        console.log("user id >>", userid);
    })
}
setUserId()
function saveDataToTaskStore(key, data) {
    let task = []
    GetLocalStorageData(TASK_KEY).then(result => {
        task = result
        data.id = Math.floor(Date.now() / 1000).toString().substr(5, 10)
        task.push(data)
        localStorage.setItem(key, JSON.stringify(task))
    }).catch(err => {
        data.id = 0
        task.push(data)
        localStorage.setItem(key, JSON.stringify(task))
    })
}
function saveTaskDetails(title, desc, stdate, enddate, status) {
    let obj = {
        u_id: userid,
        title: title,
        desc: desc,
        stdate: stdate,
        enddate: enddate,
        status: parseInt(status)
    }
    saveDataToTaskStore(TASK_KEY, obj)
    window.location.href = '../dashboard.html'

}

function RedirectToUpdate(id) {
    window.location.href = `../updatetask.html?${id}`
}