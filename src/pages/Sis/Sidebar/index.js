import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Styled
import { Side } from './styles';
import { Button } from '~/components/Button';
import * as actions from '../../../store/actions/actions'
// Logo
// Connection Redux
import { connect } from 'react-redux';
import UseFirestore, { UseGetFireStore } from "../../../hooks/useFilestore"

import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { filter, FILTER } from '../../../store/actions/actions';
import CustomStore from '~/store/customStore';
const Buttons = styled.div`
    display: flex;

    &.wrap {
        flex-wrap: wrap;
    }
    /* justify-content: space-around; */

    button {
        margin: 5px;
    }

`;

function Sidebar({ drag, activeMenu, itensMenu, actions}) {
    const [quality, setQuality] = useState('all');
    const [status, setStatus] = useState('all');
    const [docs, setDocs] = useState([]);

    
    useEffect(() => {
        const getData = async() => {
            const tmp_docs = await UseGetFireStore("dash_data", {quality, status});
            console.log("nav-bar reqData mount", tmp_docs);
            CustomStore.replace(tmp_docs)
            setDocs(tmp_docs)
        }
        getData();
    }, []);

    const qualityChanged = e => {
        console.log('QualitySelector changed: ', e.target.value);
        setQuality(e.target.value);
    }

    const statusChanged = e => {
        console.log('StatusSelector changed: ', e.target.value);
        setStatus(e.target.value);
    }

    const onFilter = async (e) => {
        const tmp_docs = await UseGetFireStore("dash_data", {quality, status});
        console.log("nav-bar reqData", tmp_docs);
        CustomStore.replace(tmp_docs)
        setDocs(tmp_docs)
    }

    return (
        <Side drag={drag}>
            <div className="logo" style={{ color: "white" }}>
                DashBoard
            </div>
            <div className="logo" style={{ color: "white" }}>
                please select items...
            </div>
            <div style={{display: 'grid', margin: '5px', padding: '5px'}}>
                <label className='sm-12' style={{ color: "white", margin: '5px'}}>Quality: </label>
                <select className='sm-12' style={{ fontSize: '15px', margin: '5px'}} onChange={(e) => qualityChanged(e)}>
                    <option selected value="all">Choose...</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                </select>
            </div>
            
            <div style={{display: 'grid', margin: '5px', marginTop: '30px', padding: '5px'}} onChange={(e) => statusChanged(e)}>
                <label className='sm-12' style={{ color: "white", margin: '5px' }}>Status: </label>
                <select className='sm-12' style={{ fontSize: '15px', margin: '5px'}}>
                    <option selected value="all">Choose...</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="unfulfilled">Unfulfilled</option>
                </select>
            </div>

            <div className="card-actions flex-end" style={{ marginTop: '30px', float: 'right', paddingRight: '20px'}}>
                <Button className="success btn-circle" onClick={(e) => onFilter(e)}>
                    Submit
                </Button>
            </div>
        </Side>
    );
}

// export default memo(
//     connect(state  => ({
//         activeMenu: state.menu.activeMenu,
//         itensMenu: state.menu.itens
//     }))(Sidebar)
// );

const mapStateToProps = ({menu}) => ({
    activeMenu: menu.activeMenu,
    itensMenu: menu.itens,
})

const mapDispatchToProps = dispatch => ({
    actions:bindActionCreators({...actions, filter:actions.filter}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);