import { useState, useEffect } from 'react';
import { debounce } from '../utils';

// This hook works like useState but will get and set the value from chrome.storage.sync
// It will also update the value when it changes in chrome.storage.sync
// It will also update chrome.storage.sync when the value changes
const useChromeStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
    const [value, setValue] = useState<T>(defaultValue);
    const setDebounceValue = debounce((value: T) => {
        chrome.storage.sync.set({ [key]: value });
    }, 500)

    // Load value from chrome.storage.sync
    useEffect(() => {
        chrome.storage.sync.get([key], (result) => {
            if (result[key]) {
                setValue(result[key]);
            }
        });
    }, [key]);

    // Update chrome.storage.sync when value changes



    useEffect(() => {
        setDebounceValue(value)
    }, [key, value]);



    return [value, setValue];
}

export default useChromeStorage;