import "./App.scss";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { UsersList } from "./components/UsersList";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "./store";

const store = configureStore({ reducer: rootReducer });

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header title={"User Management"} />
        <Content>
          <UsersList />
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
