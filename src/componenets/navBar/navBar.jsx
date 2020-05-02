
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { MediaTypes } from '../interfaces';

const NavBar = (props) => {
  const {
    onShowTypeSelect,
    onSearchBtnClick,
    onSearchKeyDown,
    searchQuery,
    onSearchQueryChange,
  } = props;
  const textInput = useRef(null);
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Popcorn</Navbar.Brand>
      <Nav>
        <Nav.Item onClick={() => onShowTypeSelect(MediaTypes.TV)}>
          <img src="../../../icons/television.svg" alt="TV" />
        </Nav.Item>
        <Nav.Item onClick={() => onShowTypeSelect(MediaTypes.Movie)}>
          <img src="../../../icons/icons8-final-cut-pro-x.svg" alt="Movies" />
        </Nav.Item>

      </Nav>
      <Form inline>
        <FormControl
          type="text"
          ref={textInput}
          value={searchQuery}
          onKeyPress={onSearchKeyDown}
          onChange={() => onSearchQueryChange(textInput.current.value)}
          className="mr-sm-2"
        />
        <Button
          onClick={onSearchBtnClick}
          type="button"
          variant="outline-success"
        >
          Search
        </Button>
      </Form>


    </Navbar>

  );
};

export default NavBar;
