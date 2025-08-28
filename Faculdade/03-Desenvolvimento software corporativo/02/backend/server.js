const express = require('express')
const path = require ('path')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../renderer/views'))
app.use(express.static(path.join(__dirname, '../renderer/public')))

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(3000, ()=>{
    console.log('servidor inicializado com sucesso!')
    }
)