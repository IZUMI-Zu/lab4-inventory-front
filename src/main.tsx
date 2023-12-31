import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Layout } from "./components/layout/layout";
import SerialPortProvider from './utils/SerialProvider';
import './styles/index.css'

const InventoryTable = React.lazy(() => import('./pages/index'));
const InventorySubmit = React.lazy(() => import('./pages/inventory'));
const InventoryRead = React.lazy(() => import('./pages/inventory_read'));
const Developer = React.lazy(() => import('./pages/developers'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <NextUIProvider>
        <SerialPortProvider>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<InventoryTable />} />
                <Route path="/inventory" element={<InventorySubmit />} />
                <Route path="/inventory_read" element={<InventoryRead />} />
                <Route path="/developers" element={<Developer />} />
              </Routes>
            </Suspense>
          </Layout>
        </SerialPortProvider>
      </NextUIProvider>
    </Router>
  </React.StrictMode>,
)
