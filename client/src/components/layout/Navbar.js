import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AppNavbar = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <header>
      <div className="heading">
        <h1 className="logo">
          <span style={{ color: '#B7B7B7' }}>AuTO</span>
          <span style={{ color: '#383D4F' }}>center</span>
        </h1>
        <h2 className="phone-number">
          +38 (091) 600-75-00 <i className="fas fa-phone-square"></i>
        </h2>
      </div>
      <nav>
        <ul className="navigation">
          <Link style={{ color: '#ddd', textDecoration: 'none' }} to="/">
            <li>главная</li>
          </Link>
          <a
            style={{ color: '#ddd', textDecoration: 'none' }}
            href="https://cargoline.com.ua/tamozhennyij-kalkulyator.html">
            <li>Калькулятор растаможки</li>
          </a>
          {isAuthenticated ? (
            <Link style={{ color: '#ddd', textDecoration: 'none' }} to="/admin">
              <li>админ панель</li>
            </Link>
          ) : (
            ''
          )}
        </ul>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AppNavbar);
