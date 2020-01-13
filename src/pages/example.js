import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@/models/actions/example';

const Example = () => {
    const count = useSelector(state => state.example.count);

    const [state, setState] = useState(false);
    const dispatch = useDispatch();

    const incrementAction = useCallback(() => dispatch(increment(state)));
    return (
        <div>
            <Link href="/">
                <a href="">home</a>
            </Link>
            <p>{ `${state}` }</p>
            <button onClick={ () => setState(true) }>点我</button>
            <p>{ count }</p>
            <button onClick={ () => incrementAction() }>点我</button>
        </div>
    );
};

export default Example;
