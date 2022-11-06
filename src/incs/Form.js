import React, { Component } from 'react';

export default class Form extends Component {

    state = { name: '', phone: '' }

    render() {
        const onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }

        const onAdd = (e) => {
            const modal = document.getElementById("add-contact-modal")

            modal.style.display = "block"
        }

        const onClose = () => {
            const modal = document.getElementById("add-contact-modal")

            modal.style.display = "none"
        }

        const onSubmitFunc = (e) => {
            e.preventDefault()

            const warn = document.getElementById("warn")

            if (this.state.name && this.state.phone) {

                if (this.props.contacts.some(item => item.phone === this.state.phone)) {


                    document.querySelector(".warn").classList.remove("hide")
                    setTimeout(() => { document.querySelector(".warn").classList.add("hide") }, 2000);


                } else {

                    this.props.addContact({ ...this.state })
                    this.setState({ name: "", phone: "" })

                    var modal = document.getElementById("add-contact-modal")

                    modal.style.display = "none"
                }
            }
        }

        return (
            <div class="container pt-5">

                <div class="modal" id="add-contact-modal" tabindex="-1">
                    <div class="modal-backdrop fade show" onClick={onClose} style={{ zIndex: -1 }}></div>

                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add Contact</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                            </div>
                            <form onSubmit={onSubmitFunc}>
                                <div class="modal-body">
                                    <span class="warn hide"><div class="alert alert-warning" style={{ float: "left", width: "100%", textAlign: "left" }} role="alert"><strong>Warning!</strong> That number already exists.</div></span>
                                    <div className="input-group mb-3">
                                        <label for="name" class="col-12 col-form-label" style={{ textAlign: "left" }}>Name</label>
                                        <div class="col-12">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="What's the name?"
                                                onChange={onChange} value={this.state.name} required />
                                            </div>
                                    </div>

                                    <div className="relative">
                                        <div className="input-group mb-3">
                                            <label for="phone" className="col-12 col-form-label" style={{textAlign: "left"}}>Phone</label>
                                            <div class="col-12">
                                            <input type="tel" inputMode="numeric" pattern="[0-9]{10}" className="form-control" id="phone" name="phone" placeholder="What's the phone number?"
                                                    onChange={onChange} value={this.state.phone} required />
                                                </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" onClick={onClose} data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="row pb-2">
                    <span class="removed hide"><div class="alert alert-success" style={{ float: "left", width: "100%", textAlign: "left" }} role="alert"><strong>Success!</strong> The contact <span id="who"></span> has been deleted!</div></span>
                    <div class="col-3">
                        <h1 style={{ textAlign: "left" }}>Contacts</h1>
                    </div>
                    <div class="col-9">
                        <button style={{ padding: "10px", fontSize: "1.2rem", fontWeight: "700", float: "right" }} type="button" class="btn btn-primary px-4" onClick={onAdd}>+ Add Contact</button>
                    </div>
                </div>
            </div>);
    }
}