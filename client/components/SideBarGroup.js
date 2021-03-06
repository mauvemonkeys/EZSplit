import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGroupsThunk, selectGroupThunk} from '../store/groups'
import {Table, CreateGroup} from '../components/index'
import {Dropdown, Popup, Container} from 'semantic-ui-react'

const style = {
  borderRadius: 0,
  opacity: 0.93,
  padding: '2em',
  backgroundColor: 'whitesmoke'
}

class SideBarGroup extends Component {
  state = {
    selectedGroup: null,
    isOpen: true
  }
  async componentDidMount() {
    await this.props.getGroupsThunk(this.props.user.email)
  }

  onChange = async (event, {value}) => {
    await this.props.selectGroupThunk(value)
    await this.setState({
      selectedGroup: {...this.props.selectedGroup}
    })
  }

  handleOpen = () => {
    if (this.state.isOpen) this.setState({isOpen: false})
  }

  render() {
    const groups = this.props.groups.map(group => {
      return {
        key: group._id,
        text: group.name,
        value: group._id
      }
    })
    return (
      <div className="table-sidebar-container">
        {this.props.userReceipts.receipts &&
        this.props.userReceipts.receipts.length ? (
          <Table selectedGroup={this.state.selectedGroup} />
        ) : (
          <Popup
            trigger={<Table selectedGroup={this.state.selectedGroup} />}
            content="Here is your receipt! Please verify and make changes."
            on="click"
            style={style}
            open={this.state.isOpen}
            onClick={this.handleOpen}
            position="top center"
          />
        )}
        <Container className="sidebar-container">
          {!this.props.groups.length ? (
            <Popup
              trigger={
                <div>
                  <h3>Choose a group</h3>
                  <Dropdown
                    onChange={this.onChange}
                    placeholder="Select Group"
                    search
                    selection
                    options={groups}
                    style={{width: '50%'}}
                  />
                </div>
              }
              content="Please create a group and add your friends."
              on="click"
              // style={style}
              open={true}
              position="right center"
            />
          ) : (
            <div className="Yuva">
              <h3>Select a group to save receipt</h3>
              <Dropdown
                onChange={this.onChange}
                placeholder="Select Group"
                search
                selection
                options={groups}
                style={{width: '50%'}}
              />
            </div>
          )}
          <CreateGroup groups={this.props.groups} />
        </Container>
      </div>
    )
  }
}
//
const mapState = state => ({
  selectedGroup: state.groups.selectedGroup,
  groups: state.groups.groups,
  user: state.user,
  userReceipts: state.receipts.userReceipts
})

const mapDispatch = dispatch => ({
  getGroupsThunk: userId => dispatch(getGroupsThunk(userId)),
  selectGroupThunk: groupId => dispatch(selectGroupThunk(groupId))
})

export default connect(mapState, mapDispatch)(SideBarGroup)
