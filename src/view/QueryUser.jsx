import React from 'react';

import { connect } from "react-redux";
import { aShowHome, aPurchase } from '../redux/actions';


const QueryUser = (props) => {

    return(
        <div>
            query
        </div>
    )
}

const mapStateToProps = (state) => ({
    msg : state.data.loginMsg,
});

const mapDispatchToProps = {
    aShowHome
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryUser);