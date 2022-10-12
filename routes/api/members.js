const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')

// Gets All Members 
router.get("/", (req, res) => {
    res.json(members)
})

// Get Single Member
// some : kegunaan menguji apakah elemen array ada atau tidak adaa
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        res.status(400).json({msg: `Please include a name and email`})
    }

    members.push(newMember)
    res.json(members)
    // res.redirect('/')
})

// Update Member
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                
                res.json({msg: 'Member Updated', member})
            }

        })
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})

// Deleted Member
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        req.json({
            msg: "Member deleted",
            members: res.json(members.filter(member => member.id === parseInt(req.params.id)))
        })
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})

module.exports = router;