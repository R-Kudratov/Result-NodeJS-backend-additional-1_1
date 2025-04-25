const yargs = require('yargs')
const pkg = require('./package.json')
const { addNote, editNote, removeNote, printNotes } = require('./notes.controller')

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true
        }
    },
    handler({title}) {
        addNote(title)
    }
})

yargs.command({
    command: 'edit',
    describe: 'Edit note by id',
    builder: {
        id: {
            type: 'string',
            describe: 'Note id',
            demandOption: true
        },
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true
        }
    },
    async handler({id, title}) {
        // console.log(id, title)
        await editNote(id, title)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    builder: {
        id: {
            type: 'string',
            describe: 'Note id',
            demandOption: true
        }
    },
    async handler({id}) {
        await removeNote(id)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print a list of notes',
    async handler() {
        await printNotes()
    }
})

yargs.parse()