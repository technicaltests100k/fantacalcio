import React from 'react';
import config from './Config';
import sinon from 'sinon';
import App from './App';
import mockDataApi from './API/match-lineups.json';

let stubFetchData;
let stubConnectToPusher;
let stubSubscribeChannel;
let stubBindToChannel;
let stubComponentWillUnmount;
let wrapper;
const mockFetchedData = mockDataApi.lineups[0];
const mockedSocket = {
  connection: () => {},
  disconnect: () => {},
  subscribe: () => {}
};

describe('<App />', () => {
  beforeAll(() => {
    // console.log('FETCH', fetch);
    // const fetch = sinon.stub();
    stubFetchData = sinon.stub(App.prototype, 'fetchData').callsFake(() => {
      return mockFetchedData;
    });
    stubConnectToPusher = sinon.spy(App.prototype, 'connectToPusher');
    // .callsFake(() => {
    //   return mockedSocket;
    // });
    stubSubscribeChannel = sinon.spy(App.prototype, 'subscribeChannel');
    // .callsFake(() => {
    //   return 'channel';
    // });
    stubBindToChannel = sinon.spy(App.prototype, 'bindToChannel');
    // .callsFake(() => {});
    stubComponentWillUnmount = sinon.spy(App.prototype, 'componentWillUnmount');
    // stubComponentWillUnmount = sinon
    //   .stub(App.prototype, 'componentWillUnmount')
    //   .callsFake(() => {});

    wrapper = mount(<App />);
  });

  it('should call FetchData only once with the right endpoint', () => {
    expect(
      stubFetchData.calledWith(config.endpoint, wrapper.instance().updateTeam)
    ).toBeTruthy();
    expect(stubFetchData.called).toBeTruthy();
    expect(stubFetchData.calledOnce).toBeTruthy();
  });

  it('should connect to Pusher with the right args and be called only once', () => {
    expect(
      stubConnectToPusher.calledWith('6a3acdaba86ad858948b', { cluster: 'eu' })
    ).toBeTruthy();
    expect(stubConnectToPusher.called).toBeTruthy();
    expect(stubConnectToPusher.calledOnce).toBeTruthy();
  });

  it('should subscribe to a channel calling the function once with the right args', () => {
    // expect(
    //   stubSubscribeChannel.calledWith(mockedSocket, config.pusher.channel)
    // ).toBeTruthy();
    expect(stubSubscribeChannel.called).toBeTruthy();
    expect(stubSubscribeChannel.calledOnce).toBeTruthy();
  });

  it('should bind to a channel calling the function only once with the right args', () => {
    // expect(
    //   stubBindToChannel.calledWith('channel', config.pusher.event)
    // ).toBeTruthy();
    expect(stubBindToChannel.called).toBeTruthy();
    expect(stubBindToChannel.calledOnce).toBeTruthy();
  });

  it('should update the App state after fetching the data for the first time', () => {
    expect(wrapper.state().currentTeam).toEqual({});
    wrapper.instance().updateTeam(stubFetchData());
    expect(wrapper.state().currentTeam).toEqual(mockFetchedData);
  });

  // it('should ', () => {
  //   console.log('instance', wrapper.instance().socket);
  //   const socket = wrapper.instance().socket;
  //   const stubDisconnect = sinon.stub(socket, 'disconnect');
  //   expect(stubDisconnect.called).toBeTruthy();
  //   expect(stubDisconnect.calledOnce).toBeTruthy();
  // });

  it('test', () => {
    wrapper.unmount();
    console.log('stubComponentWillUnmount', stubComponentWillUnmount.callCount);
    expect(stubComponentWillUnmount.called).toBeTruthy();
    expect(stubComponentWillUnmount.calledOnce).toBeTruthy();
  });
});
