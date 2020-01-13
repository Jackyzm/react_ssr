import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { increment } from '@/models/actions/example';
import Head from '@/components/head';
import Nav from '@/components/nav';

import styles from './index.less';

const Home = () => {
    const count = useSelector((state) => state.example.count);

    const [state, setState] = useState(false);

    const dispatch = useDispatch();

    const incrementAction = useCallback(() => dispatch(increment(state)));
    return (
        <div>
            <Head title="Home" />
            <Nav />

            <div className={ styles.hero }>
                <h1 className={ styles.title }>Welcome to Next!</h1>
                <p className={ styles.description }>
                To get started, edit
                    <code>pages/index.js</code>
                and save to reload.
                </p>

                <div className={ styles.row }>
                    <Link href="https://github.com/zeit/next.js#getting-started">
                        <a className={ styles.card }>
                            <h3>Getting Started &rarr;</h3>
                            <p>
                            Learn more about Next on Github and in their
                            examples
                            </p>
                        </a>
                    </Link>
                    <Link href="https://open.segment.com/create-next-app">
                        <a className={ styles.card }>
                            <h3>Examples &rarr;</h3>
                            <p>
                            Find other example boilerplates on the
                                <code>create-next-app</code>
                            site
                            </p>
                        </a>
                    </Link>
                    <Link href="https://github.com/segmentio/create-next-app">
                        <a className={ styles.card }>
                            <h3>Create Next App &rarr;</h3>
                            <p>
                            Was this tool helpful? Let us know how we can
                            improve it
                            </p>
                        </a>
                    </Link>
                </div>
                <Link href="/example">
                    <a>example</a>
                </Link>
                <p>{ `${state}` }</p>
                <button onClick={ () => setState(true) }>点我</button>
                <p>{ count }</p>
                <button onClick={ () => incrementAction() }>点我</button>
                <Button type="primary">12321</Button>
            </div>
        </div>
    );
};

export default Home;
