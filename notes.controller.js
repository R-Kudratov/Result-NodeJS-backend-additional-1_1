const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const dbPath = path.join(__dirname, 'db.json')

async function getNotes () {
    const notes = await fs.readFile(dbPath, 'utf-8')
    const parsedNotes = JSON.parse(notes)
    return Array.isArray(parsedNotes) ? parsedNotes : []
}

function updateDbNotes(notes) {
    return fs.writeFile(dbPath, JSON.stringify(notes))
}

async function addNote (title) {
    const notes = await getNotes()

    const newNote = {
        title,
        id: Date.now().toString()
    }

    notes.push(newNote)

    await updateDbNotes(notes)
    console.log(chalk.bgGreen('Note added successfully'))
}

async function editNote (id, title) {
    const notes = await getNotes()

    const updatedNotes = notes.map(note => 
        note.id === id ? {...note, title} : note
    )

    await updateDbNotes(updatedNotes)
    console.log(chalk.bgYellow(`Note with id=${id} edited successfully`))
}

async function removeNote (id) {
    const notes = await getNotes()

    const updatedNotes = notes.filter(note => note.id !== id)

    await updateDbNotes(updatedNotes)
    console.log(chalk.bgRed(`Note with id=${id} removed successfully`))
}

async function printNotes () {
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is a list of notes:'))
    notes.forEach(note => console.log(chalk.blue(note.id, note.title)))

}

module.exports = { addNote, editNote, removeNote, printNotes }