import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, List, InputItem, TextareaItem, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class LaobanInfo extends Component {

    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
        company: '', // 公司名称
        salary: '' // 工资
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    // 设置更新header
    setHeader = (header) => {
        this.setState({header})
    }

    render() {
        const {header, type} = this.props.user
        if(header){ // 户信息已完善
            // /laoban /dashen
            return <Redirect to='/laoban'/>
        }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <WingBlank>
                    <List>
                        <InputItem placeholder='请输入招聘职位'
                                   onChange={val => this.handleChange('post', val)}>招聘职位</InputItem>
                        <InputItem placeholder='请输入公司名称' onChange={val => this.handleChange('company', val)}>公司名称</InputItem>
                        <InputItem placeholder='请输入职位薪资' onChange={val => this.handleChange('salary', val)}>职位薪资</InputItem>
                        <TextareaItem title='职位要求' rows={3} onChange={val => this.handleChange('info', val)}/>
                        <Button type="primary" onClick={this.save}>保存</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(LaobanInfo)