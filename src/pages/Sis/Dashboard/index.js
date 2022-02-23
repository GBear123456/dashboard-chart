import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
// Icons
import { FiCalendar, FiMessageCircle, FiLogOut, FiUsers } from 'react-icons/fi';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CardDashboard, Card } from '~/components/Card';
import { Table } from '~/components/Table';

import { getToken } from '~/services/auth';
import * as actions from '../../../store/actions/actions';

import ChartView from '../../../components/Chart/ChartView';
import CustomStore from '~/store/customStore';

let array = [
    {
        id: 1,
        name: 'Luis Otávio',
    },
    {
        id: 2,
        name: 'Fernando Moreira',
    },
    {
        id: 3,
        name: 'José Augusto',
    },
    {
        id: 2,
        name: 'Jonathan Moreira',
    },
]

const Dashboard = observer(() => {
    const [itemdata, setItemdata] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    useEffect(() => {
        document.title = 'Dashboard'
    }, []);
    return (
        <>
            <div className="col-12 title">
                <h1>Dashboard Content</h1>
            </div>
            <div className="col-4 px-0">
                <CardDashboard className="card-dashboard red" style={{minHeight:"500px"}}>
                    <div className="card-title">
                        Pie Chart
                    </div>
                    {/* <div className="card-body"> */}
                        <ChartView data={CustomStore.data} country="0"/>    
                    {/* </div> */}
                </CardDashboard>
            </div>
            <div className="col-4 px-0">
                <CardDashboard className="card-dashboard blue" style={{minHeight:"500px"}}>
                    <div className="card-title">
                        Bar Chart
                    </div>
                    {/* <div className="card-body d-flex"> */}
                        <ChartView data={CustomStore.data} country="1"/>    
                    {/* </div> */}
                </CardDashboard>
            </div>
            <div className="col-4 px-0">
                <CardDashboard className="card-dashboard green" style={{minHeight:"500px"}}>
                    <div className="card-title">
                        Line Chart
                    </div>
                    {/* <div className="card-body"> */}
                        <ChartView data={CustomStore.data} country="2"/>    
                    {/* </div> */}
                </CardDashboard>
            </div>
            <div className="col-12 px-0">
                <Card className="red">
                    <div className="card-title">
                        <h3>Tables</h3>
                    </div>
                    <div className="card-body">
                        <Table>
                            <thead>
                                <tr>
                                    <th className="col-1">No</th>
                                    <th className="col-3">Year</th>
                                    <th className="col-3">Quality</th>
                                    <th className="col-3">Status</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(CustomStore.data.docs)? CustomStore.data.docs.map((dt, index) => (
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{ index + 1}</td>
                                        <td style={{ textAlign: 'center' }}>{ dt.year }</td>
                                        <td style={{ textAlign: 'center' }}>{ dt.quality }</td>
                                        <td style={{ textAlign: 'center' }}>{ dt.status }</td>
                                        <td style={{ textAlign: 'center' }}>{ dt.count }</td>
                                    </tr>
                                )):null}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        </>
    );
})



const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
})

const mapStateToProps = ({test}) => ({
    err: test.err,
    data: test.data
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)