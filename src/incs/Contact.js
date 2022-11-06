import React, { Component } from 'react';
import Form from './Form';
import List from './List';

export default class Contact extends Component {
    state = {
        contacts: [],
        grabData: false,
        headers: {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "accept-language": "en-US,en;q=0.5",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "sec-gpc": "1",
                "upgrade-insecure-requests": "1"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET"
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.grabCurrentDB();
        }, 1000)

    }

    async grabCurrentDB() {
        await fetch("https://shorten.shawdy.io/https://canihazprivacy.com/phoneapp/view", this.state.headers).then(res => res.json()).then((json) => {
            let jsonData = json

            const { contacts } = this.state

            for (var val in jsonData) {
                contacts.push(jsonData[val])
            }

            this.setState({ contacts })

            const loader = document.getElementById("loader")
            const contents = document.getElementById("contents")

            loader.style.display = "none"
            contents.style.display = "block"
        })
    }

    async addContactDB(user, phone) {
        await fetch(`https://shorten.shawdy.io/https://canihazprivacy.com/phoneapp/add?user=${user}&phone=${phone}`, this.state.headers).then(res => res.json()).then((json) => {
            let jsonData = json


            console.log(jsonData)
        });
    }

    async deleteContactDB(user, phone) {
        await fetch(`https://shorten.shawdy.io/https://canihazprivacy.com/phoneapp/delete?user=${user}&phone=${phone}`, this.state.headers).then(res => res.json()).then((json) => {
            let jsonData = json

            console.log(jsonData)
        });
    }

    render() {
        const addContact = (data) => {
            const { contacts } = this.state
            contacts.push(data)
            try {
                if (contacts.includes(data['phone'])) {
                    console.log('dfsfsf')
                }
                this.addContactDB(data['name'], data['phone'])
            } catch (err) { }
            this.setState({ contacts })
        }

        const change = (data) => {
            const { contacts } = this.state
            try {
                let toDelete = contacts.filter(x => !data.includes(x))[0]
                document.querySelector(".removed").classList.remove("hide")
                setTimeout(() => { document.querySelector(".removed").classList.add("hide") }, 2000);
                document.getElementById("who").innerHTML = `<strong>${toDelete['name']}</strong>`
                this.deleteContactDB(toDelete['name'], toDelete['phone'])
            } catch (err) { }
            this.setState({ contacts: data })
        }

        return (
            <div className="main">
                <h2 className="display-4 mb-3"><i className="bi bi-person-rolodex display-4"> </i>Phone Book App</h2>
                <div id="contents" style={{ display: "none" }}>
                    <Form addContact={addContact} contacts={this.state.contacts} />
                    <List change={change} contacts={this.state.contacts} />
                </div>
                <div style={{ padding: "25%" }} id="loader">
                    <div class="spinner-grow text-primary" role="status">

                    </div></div>
            </div>);
    }
}