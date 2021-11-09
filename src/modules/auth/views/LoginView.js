import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import {AuthLayout} from "../layouts/AuthLayout";
import { useForm } from "../../../hooks/useForm";
import { login } from "../../../actions/auth";
import SEE_IMAGE from "../../../assets/icons/see.svg";
import NOT_SEE_IMAGE from "../../../assets/icons/not-see.svg";

export const LoginView = () => {
  const dispatch = useDispatch();

  const [seePassword, setSeePassword] = useState(false);
  const [formLoginValues, handleLoginInputChange] = useForm({
    username: "",
    password: "",
  });

  const { username, password } = formLoginValues;

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({ username, password }));
  };

  const handleSeePasword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <AuthLayout>
      <form
        className="col-12 col-sm-10 col-md-8 col-lg-5 card shadow p-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-center">Bienvenido</h2>
        <div className="col-12 mx-auto mt-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              name="username"
              value={username}
              onChange={handleLoginInputChange}
              required
              minLength="3"
            />
          </div>
          <div className="input-group mt-4">
            <input
              type={seePassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              name="password"
              value={password}
              onChange={handleLoginInputChange}
              required
              minLength="4"
            />
            <div className="input-group-append" onClick={handleSeePasword}>
              <ImgContainer className="input-group-text">
                {!seePassword ? (
                  <Img
                    alt="see"
                    src={SEE_IMAGE}
                    className="figure-img img-fluid"
                  />
                ) : (
                  <Img
                    alt="not see"
                    src={NOT_SEE_IMAGE}
                    className="figure-img img-fluid"
                  />
                )}
              </ImgContainer>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center mt-4">
          <button
            type="submit"
            disabled={!username && !password}
            className="btn btn-outline-primary btn-lg"
          >
            Login
          </button>
        </div>
        <div className="col-12 d-flex justify-content-center mt-1">
          <Link to="/auth/register" className="link-secondary mt-3">
            Registrarse
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

const ImgContainer = styled.span`
  width: 50px;
  height: 100%;
  cursor: pointer;
`;

const Img = styled.img`
  filter: invert(20%);
  margin: auto;
`;
