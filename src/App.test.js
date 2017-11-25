import React from 'react';
import config from './Config';
import App from './App';
import mockDataApi from './API/match-lineups.json';

let spyFetchData;
let spyConnectToPusher;
let spySubscribeChannel;
let spyBindToChannel;
let spyComponentWillUnmount;
let wrapper;
const mockFetchedData = mockDataApi.lineups[0];

describe('<App />', () => {
  it('should call FetchData only once with the correct endpoint', () => {
    spyFetchData = jest.spyOn(App.prototype, 'fetchData');
    wrapper = shallow(<App />);
    expect(spyFetchData).toHaveBeenCalled();
    expect(spyFetchData).toHaveBeenCalledTimes(1);
    expect(spyFetchData).toHaveBeenCalledWith(
      config.endpoint,
      wrapper.instance().updateTeam
    );
  });

  it('should connect to Pusher with the correct args and be called only once', () => {
    spyConnectToPusher = jest.spyOn(App.prototype, 'connectToPusher');
    wrapper = shallow(<App />);
    expect(spyConnectToPusher).toHaveBeenCalled();
    expect(spyConnectToPusher).toHaveBeenCalledTimes(1);
    expect(spyConnectToPusher).toHaveBeenCalledWith(config.pusher.key, {
      cluster: config.pusher.cluster
    });
  });

  it('should subscribe to a channel calling the function once with the correct args', () => {
    spySubscribeChannel = jest.spyOn(App.prototype, 'subscribeChannel');
    wrapper = shallow(<App />);
    expect(spySubscribeChannel).toHaveBeenCalled();
    expect(spySubscribeChannel).toHaveBeenCalledTimes(1);
    expect(spySubscribeChannel).toHaveBeenCalledWith(
      wrapper.instance().socket,
      config.pusher.channel
    );
  });

  it('should bind to a channel calling the function only once with the correct args', () => {
    spyBindToChannel = jest.spyOn(App.prototype, 'bindToChannel');
    wrapper = shallow(<App />);
    expect(spyBindToChannel).toHaveBeenCalled();
    expect(spyBindToChannel).toHaveBeenCalledTimes(1);
    expect(spyBindToChannel).toHaveBeenCalledWith(
      wrapper
        .instance()
        .subscribeChannel(wrapper.instance().socket, config.pusher.channel),
      config.pusher.event
    );
  });

  it('should update the App state after fetching the data for the first time', () => {
    expect(wrapper.state().currentTeam).toEqual({});
    wrapper.instance().updateTeam(mockFetchedData);
    expect(wrapper.state().currentTeam).toEqual(mockFetchedData);
  });

  it('should unmount the component ', () => {
    console.error = jest.fn();
    spyComponentWillUnmount = jest.spyOn(App.prototype, 'componentWillUnmount');
    const test = mount(<App />);
    test.unmount();
    expect(spyComponentWillUnmount).toHaveBeenCalled();
    expect(spyComponentWillUnmount).toHaveBeenCalledTimes(1);
  });
});
