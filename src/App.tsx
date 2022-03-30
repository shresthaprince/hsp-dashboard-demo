// Components
import Card from './Card';
// Styles
import { Wrapper } from './App.styles';


import logo1 from './img/l2.png';

import videou from './video/u1.mp4';

const App: React.FC = () => {
  return (
    <Wrapper>
      <Card logo={logo1} video={videou} />
      <Card logo={logo1} video={videou} />

    </Wrapper>
  );
}

export default App;
