import React from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary'

const layout = (props) => (
    <Auxilliary>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Auxilliary>
);

export default layout;