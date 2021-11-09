import styled from "styled-components";

export const AuthLayout = (props) => (
  <Container
    className="
          container
          d-flex
          align-content-center
          flex-wrap
          justify-content-center
        "
  >
    {props.children}
  </Container>
);

const Container = styled.div`
  height: 100vh;
`;
