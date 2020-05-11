import { useScrollTrigger, Slide } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { MediaTypes } from '../interfaces';
import {
  AntTab, AntTabs, appBarStyle, BootstrapInput
} from './navBarMaterialStyle';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,

  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


export default function NavBarMaterial(props) {
  const {
    onShowTypeSelect,
    showType,
    onSearchKeyDown,
    searchQuery,
    onSearchQueryChange,
  } = props;
  const classes = appBarStyle();
  const history = useHistory();
  const trigger = useScrollTrigger();
  const match = useRouteMatch('/show/:showId');


  const handleChange = (event, newValue) => {
    onShowTypeSelect(newValue);
  };


  return (
    <div className={classes.root}>
      <ElevationScroll>
        <Slide appear={false} direction="down" in={!trigger}>


          <AppBar position={match ? 'static' : 'fixed'}>
            <Toolbar>
              <Typography
                className={classes.title}
                onClick={() => history.push('/')}
                variant="h6"
                noWrap
              >
                PoP
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  value={searchQuery}
                  onKeyPress={onSearchKeyDown}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />

              </div>
              <AntTabs value={showType} onChange={handleChange} aria-label="simple tabs example">
                <AntTab label="Movies" value={MediaTypes.Movie} />
                <AntTab label="Tv" value={MediaTypes.TV} />
              </AntTabs>
              <Select
                className={classes.select}
                native
                value={showType}
                onChange={(e) => handleChange(e, e.target.value)}
                input={<BootstrapInput />}

              >
                <option className={classes.option} value={MediaTypes.Movie}>Movies</option>
                <option className={classes.option} value={MediaTypes.TV}>TV</option>
              </Select>
            </Toolbar>
          </AppBar>
        </Slide>
      </ElevationScroll>


    </div>
  );
}
