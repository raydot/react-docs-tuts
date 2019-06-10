import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

// Section 01
import ComponentsAndProps from './ComponentsAndProps' // This imports the component to the canvas
import ComponentsAndPropsMD from './ComponentsAndProps.md' // This imports the Markdown to notes


// Section 05 Props and State
import TickingClock from './TickingClock'
import TickingClockMD from './TickingClock.md'



storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Components', module)
  .add('The most basic Component', () => <ComponentsAndProps name="Dave" />, { notes: { markdown: ComponentsAndPropsMD } })

storiesOf('State and Lifecycle', module)
  .add('Ticking Clock', () => <TickingClock />, { notes: { markdown: TickingClockMD } })

