import React from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Button, Checkbox, DatePicker } from 'antd';
import { useGetformParams } from 'hooks/useGetformParams';
import { useRequest } from 'hooks/useRequest';
import { camelCase } from 'lodash-es';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props: HelloWorldProps) => {
    console.log(process.env, 'dsfgs');

    const selectedData = useSelector((state) => {
        console.log(state, 'stateyyyyyyyyyyyyy');
        return state;
    }, shallowEqual) as any;

    const dispatch = useDispatch();
    const [formData, setFormItem] = useGetformParams({
        name: '',
        add: '',
    });
    const submit = () => {
        console.log(formData);
    };
    console.log(camelCase('Foo Bar'));
    const [isFetching, res] = useRequest(
        {
            method: 'get',
            url: '/api/v2/all',
        },
        () => {
            console.log('请求完成后执行');
        },
    );
    console.log(isFetching, res, 'uuuuuuuuuuuu');
    return (
        <div>
            <div>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                        // sss;

                        setFormItem('name', e.target.value);
                    }}
                />
                <input
                    type="text"
                    value={formData.add}
                    onChange={(e) => {
                        // sss;

                        setFormItem('add', e.target.value);
                    }}
                />
                <Link to={'/about$'}>about</Link>
                <Link to={'/users$'}>users</Link>
            </div>
            <button onClick={submit}>测试</button>
            <DatePicker />
            <button
                onClick={() => {
                    dispatch({
                        type: 'rotate',
                        payload: {
                            per_page: 2,
                        },
                    });
                }}
            >
                发action
            </button>
            {selectedData.showAlert ? <div>这里验证发送action</div> : null}
            <img src={require('assets/a.jpg')} />
            <Button type={'primary'}>primary</Button>
            <Checkbox>Checkbox</Checkbox>
            <div className={styles.home}>这是home页面</div>
        </div>
    );
};
