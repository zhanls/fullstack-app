import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom"
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import './index.css'
// 手动设置延迟1s加载
const slowImport = (value, ms = 1000) => {
  return new Promise(resolve=>{
      setTimeout(()=> resolve(value), ms);
  })
}
// React.lazy
const Pictures = React.lazy(() => slowImport(import('./views/Pictures'), 1000))
const NotFound = React.lazy(() => slowImport(import('./views/NotFound'), 1000))

const { Header, Sider, Content } = Layout;

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <div>Home</div>
  },
  {
    path: '/pictures',
    main: () => <Pictures />
  },
  {
    path: '*',
    main: () => <NotFound />
  }
]

const App = () => {
  let location = useLocation()
  console.log(location)
  return (
    <Layout hasSider>
      <Header className="header">
        <div className="logo">
          <img src={require('./assets/logo/logo.png')} alt="react logo"/>
          <span>React It</span>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Sider
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 64
        }}
      >
        <Menu mode="inline" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/" icon={<UserOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/pictures" icon={<VideoCameraOutlined />}>
            <Link to="/pictures">Pictures</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ padding: '64px 0 0 200px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: 'white'
          }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Suspense fallback={<div>slowly import fallback...</div>}>
              <Switch>
                {routes.map((route, index) => (
                  // Render more <Route>s with the same paths as
                  // above, but different components this time.
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                  />
                ))}
              </Switch>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

const SiderDemo  = () => {
  // let location = useLocation()
  // console.log(location)
  return (
    <Router>
      <App />
    </Router>
  );
}

const mountNode = document.getElementById('root')
ReactDOM.render(<SiderDemo />, mountNode);