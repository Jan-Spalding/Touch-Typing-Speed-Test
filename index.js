const socketio = require("socket.io");
const express = require("express")
const exp = express()

exp.use(express.static("webroot"))
const webapp = exp.listen(process.env.PORT, function() {
  console.log("Running")
})

const io = socketio(webapp)
const fs = require("fs")

let scoreLength, readData, deleteValue, appendContent;

io.on("connection", function(socket) {
  console.log(socket.id + " connected")

  readFile()

  function readFile() {
    fs.readFile("test.txt", "utf8", (err, data) => {
      if (err) {
        conosole.log(err)
        return
      }
      data = data.split(";")
      for (let i = 0; i < data.length; i++ ) {
        data[i] = data[i].split(",")
      }
      console.log(data)
      readData = data
      scoreLength = data.length
      if (readData[0][0] == "") {
        socket.emit("clear", "")
      } else {
        socket.emit("highScore", data)
      }
    })
  }

  function checkLeaderboard(data) {
    let newArray = []
    newArray.push(Number(data.myWPM))
    for (let i = 0; i < readData.length; i++) {
      newArray.push(Number(readData[i][1]))
    }
    newArray.sort(function(a,b){return a-b})
    let index = newArray.indexOf(Number(data.myWPM))
    if (index == 0) {
      socket.emit("error","Score entered isn't in the top 5")
    } else {
      deleteValue = newArray[0]
      let number = readData.length
      for (let i = 0; i < number; i++ ) {
        if (deleteValue == readData[i][1]) {
          readData.splice(i,1)
          break;
        } 
      }

      let content = [data.myUsername,data.myWPM,data.myAccuracy +"%"]
      readData.push(content)
      console.log(readData)
      sortData(readData)
    }
  }

  function sortData(readData) {
    if (appendContent == undefined) {
      readData.sort(sortfunction)
      readData.reverse()
    } else {
      scoreLength++
      readData.push(appendContent)
      readData.sort(sortfunction)
      readData.reverse()
    }


    function sortfunction(a, b) {
      return a[1]-b[1]
    }

    let content

    if (readData[0][0] == "") {
      scoreLength = 0
    }

    switch (scoreLength) {
      case 5:
        content = readData[0][0] + "," + readData[0][1] + "," + readData[0][2] + ";" + readData[1][0] + "," + readData[1][1] + "," + readData[1][2] + ";" + readData[2][0] + "," + readData[2][1] + "," + readData[2][2] + ";" + readData[3][0] + "," + readData[3][1] + "," + readData[3][2] + ";" + readData[4][0] + "," + readData[4][1] + "," + readData[4][2]
        //UPDATES FILE WITH SORTED INFORMATION
        fs.writeFile("test.txt", content, err => {
          if (err) {
            console.log(err)
            return
          }
          readFile()
        })
        break;
      case 4:
        content = readData[0][0] + "," + readData[0][1] + "," + readData[0][2] + ";" + readData[1][0] + "," + readData[1][1] + "," + readData[1][2] + ";" + readData[2][0] + "," + readData[2][1] + "," + readData[2][2] + ";" + readData[3][0] + "," + readData[3][1] + "," + readData[3][2] 
        //UPDATES FILE WITH SORTED INFORMATION
        fs.writeFile("test.txt", content, err => {
          if (err) {
            console.log(err)
            return
          }
          readFile()
        })
        break;
      case 3:
        content = readData[0][0] + "," + readData[0][1] + "," + readData[0][2] + ";" + readData[1][0] + "," + readData[1][1] + "," + readData[1][2] + ";" + readData[2][0] + "," + readData[2][1] + "," + readData[2][2]
        //UPDATES FILE WITH SORTED INFORMATION
        fs.writeFile("test.txt", content, err => {
          if (err) {
            console.log(err)
            return
          }
          readFile()
        })
        break;
      case 2:
        content = readData[0][0] + "," + readData[0][1] + "," + readData[0][2] + ";" + readData[1][0] + "," + readData[1][1] + "," + readData[1][2] 
        //UPDATES FILE WITH SORTED INFORMATION
        fs.writeFile("test.txt", content, err => {
          if (err) {
            console.log(err)
            return
          }
          readFile()
        })
        break;
      case 1:
        content = readData[0][0] + "," + readData[0][1] + "," + readData[0][2] 
        //UPDATES FILE WITH SORTED INFORMATION
        fs.writeFile("test.txt", content, err => {
          if (err) {
            console.log(err)
            return
          }
          readFile()
        })
        break;
      case 0:
        readFile()
        break;
    }
  }

  socket.on("userInput", function(data) {
    console.log(data.myUsername + " has submitted values of " + data.myWPM + " & " + data.myAccuracy)
    if (!data.myUsername) {
      socket.emit("error","Please enter a Username")
    } else if (data.myUsername.length > 20) {
      socket.emit("error","Please have a username under 20 characters")
    } else if (data.myUsername.toLowerCase().search("shit") >= 0 || data.myUsername.toLowerCase().search("fuck") >= 0 || data.myUsername.toLowerCase().search("bitch") >= 0 || data.myUsername.toLowerCase().search("ass") >= 0 || data.myUsername.toLowerCase().search("cock") >= 0 || data.myUsername.toLowerCase().search("dick") >= 0 || data.myUsername.toLowerCase().search("cunt") >= 0) {
      socket.emit("error","Please don't use profanity")
    } else if (scoreLength == 5) {
      checkLeaderboard(data)
      socket.emit("display", false)
      socket.emit("error", "")
    } else if (scoreLength < 5) {
      socket.emit("display", false)
      socket.emit("error","")
      console.log(data.myUsername + " has submitted values of " + data.myWPM + " & " + data.myAccuracy)
      if (readData[0][0] == "") {
        let content = data.myUsername + "," + data.myWPM + "," + data.myAccuracy + "%"
        fs.appendFile("test.txt", content, err =>{
          if (err) {
            console.log(err)
            return
          }
          sortData(readData)
        })
      } else {
        let content = ";" + data.myUsername + "," + data.myWPM + "," + data.myAccuracy + "%"
        appendContent = [data.myUsername , data.myWPM.toString() , data.myAccuracy + "%"]
        fs.appendFile("test.txt", content, err =>{
          if (err) {
            console.log(err)
            return
          }
          sortData(readData)
        })
      }
    } else {
      checkLeaderboard(data)
    }
  })

  socket.on("check", function(total) {
    let newArray = []
    newArray.push(Number(total))
    for (let i = 0; i < readData.length; i++) {
      newArray.push(Number(readData[i][1]))
    }
    newArray.sort(function(a,b){return a-b})
    let index = newArray.indexOf(Number(total))
    if (readData[0][0] == "" || scoreLength < 5) {
      socket.emit("error", "You managed to get on the leaderboard!")
      socket.emit("display", true)
    } else if (index == 0) {
      socket.emit("display", false)
    } else if (index >= 1) {
      socket.emit("error", "You managed to get on the leaderboard!")
      socket.emit("display", true)
    }
  })

  socket.on("clearScore", function(data) {
    if (data == "clear" ) {
      fs.writeFile("test.txt", "", err => {
      if (err) {
        console.log(err)
        return
      }
      clearBoard()
      readFile()
      })
    }
  })

  function clearBoard() {
    socket.emit("clear", "")
  }

  socket.on("disconnect", function() {
    console.log(socket.id + " disconnected")
  })
})




// fs.appendFile("test.txt", content, err =>{
//   if (err) {
//     console.log(err)
//     return
//   }
// })


// function readFile() {
//   fs.readFile("test.txt", "utf8", (err, data) => {
//     if (err) {
//       conosole.log(err)
//       return
//     }
//     socket.emit("highScore", data)
//   })
// }
