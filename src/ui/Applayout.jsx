import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr; 
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem; 
  overflow: scroll;
`;

const Max = styled.div`  /* Corrected 'dev' to 'div' */
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {  /* Corrected 'Applayout' to 'AppLayout' */
  return (
    <Container>
      <Header />
      <Sidebar />
      <Main>
        <Max>
          <Outlet />
        </Max>
      </Main>
    </Container>
  );
}

export default AppLayout;