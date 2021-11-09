import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthLayout } from "../layouts/AuthLayout";
import { useForm } from "../../../hooks/useForm";
import { signup } from "../../../actions/auth";
import SEE_IMAGE from "../../../assets/icons/see.svg";
import NOT_SEE_IMAGE from "../../../assets/icons/not-see.svg";

export const RegisterView = () => {
  const dispatch = useDispatch();
  const [seePassword, setSeePassword] = useState(false);
  const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { username, password, repeatPassword, email } = formRegisterValues;

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signup({ username, password, email }));
  };

  const handleSeePasword = () => {
    setSeePassword(!seePassword);
  };

  const handleSeeRepeatPasword = () => {
    setSeeRepeatPassword(!seeRepeatPassword);
  };

  const validForm = () => {
    return !!email && !!username && !!password && password === repeatPassword;
  };

  return (
    <AuthLayout>
      <form
        onSubmit={onSubmit}
        className="col-12 col-sm-10 col-md-8 col-lg-5 card shadow p-4"
      >
        <h2 className="text-center">Ingrese sus datos</h2>
        <div className="col-12 mx-auto mt-4">
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              name="email"
              value={email}
              onChange={handleRegisterInputChange}
              required
              minLength="3"
            />
          </div>
          <div className="input-group mt-4">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleRegisterInputChange}
              required
              minLength="5"
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
              onChange={handleRegisterInputChange}
              required
              minLength="5"
            />
            <div className="input-group-append" onClick={handleSeePasword}>
              <ImgContainer className="input-group-text">
                {!seePassword ? (
                  <Img alt="see" src={SEE_IMAGE} className="figure-img img-fluid" />
                ) : (
                  <Img alt="not see" src={NOT_SEE_IMAGE} className="figure-img img-fluid" />
                )}
              </ImgContainer>
            </div>
          </div>
          <div className="input-group mt-4">
            <input
              type={seeRepeatPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={handleRegisterInputChange}
              required
              minLength="5"
            />
            <div className="input-group-append" onClick={handleSeeRepeatPasword}>
              <ImgContainer className="input-group-text">
                {!seeRepeatPassword ? (
                  <Img alt="see" src={SEE_IMAGE} className="figure-img img-fluid" />
                ) : (
                  <Img alt="not see" src={NOT_SEE_IMAGE} className="figure-img img-fluid" />
                )}
              </ImgContainer>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center mt-4">
          <button
            type="submit"
            disabled={!validForm()}
            className="btn btn-outline-primary btn-lg"
          >
            Registrarse
          </button>
        </div>
        <div className="col-12 d-flex justify-content-center mt-1">
          <Link to="/auth/login" className="link-secondary mt-3">
            Ya tengo mi cuenta
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
