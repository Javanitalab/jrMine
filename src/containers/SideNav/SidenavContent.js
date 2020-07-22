import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {

        const parentLiEle = that.closest(this, 'li');
        if(menuLi[i].classList.contains('menu') && parentLiEle !== null) {
          event.stopPropagation();

          if(menuLi[i].classList.contains('open')) {
            menuLi[i].classList.remove('open', 'active');
          } else {
            menuLi[i].classList.add('open', 'active');
          }
        } else {
          for (let j = 0; j < menuLi.length; j++) {
            const parentLi = that.closest(this, 'li');
            if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
              menuLi[j].classList.remove('open');
            } else {
              if(menuLi[j].classList.contains('open')) {
                menuLi[j].classList.remove('open');
              } else {
                menuLi[j].classList.add('open');
              }
            }
          }
        }
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {
    const {history} = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] === 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {

    }

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">

          <li className="nav-header">
            <IntlMessages id="sidebar.main"/>
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
              <span className="nav-text">
                <IntlMessages id="sidebar.settings"/>
              </span>
            </Button>
            <ul className="sub-menu">
            <li>
                <NavLink className="prepend-icon" to="/app/dashboard/users">
                  <span className="nav-text"><IntlMessages id="sidebar.dashboard.users"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/notifications">
                  <span className="nav-text"><IntlMessages id="sidebar.dashboard.notifications"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/legs">
                  <span className="nav-text"><IntlMessages id="sidebar.dashboard.legs"/></span>
                </NavLink>
              </li>
              <li>
                    <NavLink className="prepend-icon" to="/app/dashboard/airlines">
                      <span className="nav-text"><IntlMessages id="sidebar.dashboard.airlines"/></span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="prepend-icon" to="/app/dashboard/aircrafts">
                      <span className="nav-text"><IntlMessages id="sidebar.dashboard.aircrafts"/></span>
                    </NavLink>
                  </li>

            <li>
                <NavLink className="prepend-icon" to="/app/dashboard/news">
                  <span className="nav-text"><IntlMessages id="sidebar.settings.manageAcount"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/crypto">
                  <span className="nav-text"><IntlMessages id="sidebar.settings.generalSettings"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/listing">
                  <span className="nav-text"><IntlMessages id="sidebar.settings.privilages"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/crm">
                  <span className="nav-text"><IntlMessages id="sidebar.settings.documentsSetup"/></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="ui_tooltip menu">
            <Button className="void">
              <i className="zmdi zmdi-flight-land zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.fleet"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/components/alerts">
                  <span className="nav-text"><IntlMessages id="sidebar.fleet.aircraftCrewPositions"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/components/appbar">
                  <span className="nav-text"><IntlMessages id="sidebar.fleet.fleetDocumentsSetup"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/components/auto-complete">
                                    <span className="nav-text"><IntlMessages
                                      id="sidebar.fleet.scheduleExport&Import"/></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-airplane zmdi-hc-fw"/>
              <span className="nav-text">
                            <IntlMessages id="sidebar.flight"/>
                        </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/widgets/classic">
                  <span className="nav-text"><IntlMessages id="sidebar.flight.flightEditing"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/widgets/modern">
                  <span className="nav-text"><IntlMessages id="sidebar.flight.flightNotification"/></span>
                </NavLink>
              </li>
               <li>
                <NavLink className="prepend-icon" to="/app/widgets/modern">
                  <span className="nav-text"><IntlMessages id="sidebar.flight.checklistNotification"/></span>
                </NavLink>
              </li>
            </ul>
          </li>


          <li className="nav-header">
            <IntlMessages id="sidebar.superUser"/>
          </li>

          <li className="menu">
            <Button className="void">
              <i className="zmdi zmdi-calendar zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.dataManager"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/basic">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.aircraftAssignments"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/cultures">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.aircrafts"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/dnd">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.certificates"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/rendering">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.delayCodes"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/popup-info">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.delayCodeCategories"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"  to="/app/ecommerce/products-list">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.devices"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/selectable">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.favorites"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/popup">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.flights"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/timeslots">
                  <span className="nav-text"><IntlMessages id="sidebar.dataManager.feedbacks"/></span>
                </NavLink>
              </li>
            </ul>

          </li>

        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
