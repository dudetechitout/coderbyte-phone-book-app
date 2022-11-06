import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class List extends Component {

    static propTypes = { contacts: PropTypes.array.isRequired }

    state = { filterText: "" }

    render() {

        const clear = () => { this.setState({ filterText: "" }) }

        const onChangeFilter = (e) => { this.setState({ filterText: e.target.value }) }

        const filterContacts = this.props.contacts.filter(
            item => {
                return item.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1
                    || item.phone.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1
            }
        )

        setTimeout(() => {
            const close = document.getElementById("close")
            try {
                this.state.filterText ? (close.style.display = "block") : (close.style.display = "none");
            } catch (err) { }
        }, 10);


        const makeFocus = () => {
            document.getElementById("filter").focus();
        }

        const userDel = (e) => { this.props.change(this.props.contacts.filter(item => item.phone !== e.target.id)) }

        return (
            <div class="container pt-0">
                <div class="row">
                    <div class="col-md-12 my-3">
                        <div className="filter mb-2">
                            <button type="button" class="bi bi-search search-icon" style={{ display: "block", cursor: "unset" }} onClick={makeFocus}></button>
                            <button onClick={clear} id="close" type="button" className="btn-close" aria-label="Close"></button>
                            <input className="form-control" style={{ textIndent: "25px"}} name="filter" id="filter" placeholder="Search for a contact..."
                            onChange={onChangeFilter} value={this.state.filterText} />
                        </div>
                        </div>
                </div>
                <div className="mb-3">
                            {filterContacts.map((item, index) => {
                                return <span key={index}>
                                    <div class="container px-3 border bg-white" style={{ paddingTop: "15px"}}>
                                        <div class="row">
                                            <div class="col-10">
                                                <h3 style={{ textAlign: "left" }}>{item.name}</h3>
                                                <p style={{ color: "#a6a6a6", textAlign: "start" }}><i className="bi bi-telephone-fill"> </i><span style={{ color: "#a6a6a6", fontWeight: "700", fontSize: "1.2rem" }}><a style={{textDecoration:"none", color:"inherit"}} href={"tel:" + item.phone}>
                                                    {item.phone.substr(0, 3) + "-" + item.phone.substr(3, 3) + "-" + item.phone.substr(6)} { }</a></span>

                                                </p>
                                            </div>
                                            <div class="col-2">
                                                <button id={item.phone} style={{ padding: "10px" }} type="button" class="btn btn-danger" onClick={userDel}><i id={item.phone} onClick={userDel} style={{ fontSize: "1.5rem", padding: "5px" }} className="del bi  bi-trash-fill text-white"></i></button>
                                            </div>
                                        </div>
                                        </div>
                                </span>
                            })}

                </div></div>
            );
    }
}