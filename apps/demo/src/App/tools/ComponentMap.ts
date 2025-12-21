import React from 'react'

const componentMap: { [key: string]: React.LazyExoticComponent<React.FC> } = {
  SideBar: React.lazy(() => import('../../Documentation/SideBar')),
  Pending: React.lazy(() => import('../../Documentation/Pending')),
  Icon: React.lazy(() => import('../../Documentation/Icon')),
  Button: React.lazy(() => import('../../Documentation/Button')),
};

export { componentMap };
export default componentMap;