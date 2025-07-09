import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import useStore from '../store';
import { useForm } from 'react-hook-form';
import { Button, Combobox, ComboboxButton, ComboboxInput, ComboboxOptions, Transition } from '@headlessui/react';
import { fetchCountries } from '../libs';
import { BsChevronBarExpand } from 'react-icons/bs';
import {  BiCheck, BiLoader } from 'react-icons/bi';
import Input from './ui/input';
import api from '../libs/apiCall'


export const SettingsForm = () => {
    const {user, theme, setTheme } = useStore((state) => state);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm ({
        defaultValues: {...user},
    });

    const [selectedCountry, setSelectedCountry] = useState (
        {country:user?.country,currency:user?.currency} || ""

    );

    const [ query, setQuery] = useState("");
    const[countriesData, setCountriesData] = useState([]);
    const[loading, setLoading] = useState(false);

// When we click the save button
const onSubmit = async (values) => {
    try {
        setLoading(true);

        const newData = {
            ...values,
            country: selectedCountry.country,
            currency: selectedCountry.currency,
        };

        const { data: res } = await api.put(`/user/${user?.id}`, newData);

        if (res?.user) {
        
            const newUser = { ...res.user, token: user.token }; 
            localStorage.setItem("user", JSON.stringify(newUser));
            toast.error (res?.message);
        }

    } catch (error) {
        console.error('Something went wrong', error);
        toast.error(error?.response?.data?.message || error.message);
    } finally {
        setLoading(false);
    }
};




    const toggleTheme = (val) => {
        setTheme(val);
        localStorage.setItem("theme", val);
    };

    const filteredCountries = 
    query === ""
    ? countriesData
    : countriesData.filter((country) => 
        country.country
    .toLowerCase()
    .replace(/\s+/g, "")
    .includes (query.toLowerCase().replace(/\s+/g, ""))
    );

    const getCountriesList = async () => {
        const data = await fetchCountries();
        setCountriesData(data);
        console.log("Countries data in component", data);
    };

    useEffect(() => {
        getCountriesList();
    }, []);

    useEffect(() => {
  console.log("Updated countriesData state:", countriesData); // ✅ Log after state update
}, [countriesData]);

    const Countries = () => {
        return (
            <div className='w-full'>
                <Combobox value={selectedCountry} onChange={setSelectedCountry}>
                    <div className='relative mt-1'>
                        <div className=''>
                <ComboboxInput
                className='inputStyles'
                displayValue={(country) => country?.country}
                onChange={(e) => setQuery (e.target.value)}

                />

                <ComboboxButton className='absolute inset-y-0 right-0 flex items-center pr-2'>
                    <BsChevronBarExpand className='text-gray-400' />
                </ComboboxButton>
                 </div>
                <Transition
                as = {Fragment}
                Leave= 'transition ease-in duration-100'
                LeaveFrom = 'opacity-100'
                LeaveTo = 'opacity-0'
                afterLeave = {() => setQuery ("")}
                >

                <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {filteredCountries.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-500">
                Nothing found.
                </div>
                ) : (
                filteredCountries.map((country, index) => (
                <Combobox.Option
                key={country.country + index}
                className={({ active }) =>
          `relative cursor-default select-none py-2 pl-10 pr-4 ${
            active ? "bg-violet-600/20 text-white" : "text-gray-900"
          }`
        }
        value={country}
        >
            {({selected, active}) => (
                <>
                <div className='flex items-center gap-2'>
                    <img
                    src={country?.flag}
                    alt={country.country}
                    className='w-8 h-5 rounded-sm object-cover' />

                    <span
                    className={`block truncate text-gray-700 dark:text-gray-500 ${selected? "font-medium": "font-normal"}`}
                    >
                        {country?.country}
                    </span>
                </div>
                {selected? (
                    <span 
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"}`}
                    >
                        <BiCheck className= "h-5 w-5" aria-hidden = 'true' />

                    </span>
                ): null }
                </>
            )}

      </Combobox.Option>
    ))
  )}
</ComboboxOptions>
                </Transition>
            </div>
            </Combobox>
             </div>
        );
    };

    return  ( <form onSubmit={handleSubmit (onSubmit)}
    className='space-y-5 w-full'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='w-full'>
                <Input
                disabled= {loading}
                id='firstname'
                label= "First Name"
                type='text'
                placeholder='John'
                error = {errors.firstname?.message}
                {...register("firstname")}
                className="inputStyle"
                />
            </div>

              <div className='w-full'>
                <Input
                disabled= {loading}
                id='lastname'
                label= "Last Name"
                type='text'
                placeholder='Doe'
                error = {errors.lastname?.message}
                {...register("lastname")}
                className="inputStyle"
                />
            </div>
        </div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='w-full'>
                <Input
                disabled= {loading}
                id='email'
                label= "Email"
                type='text'
                placeholder=''
                error = {errors.email?.message}
                {...register("email")}
                className="inputStyle"
                />
            </div>

                <div className='w-full'>
                <Input
                disabled= {loading}
                id='contact'
                label= "Contact"
                type='text'
                placeholder=''
                error = {errors.contact?.message}
                {...register("contact")}
                className="inputStyle"
                />
            </div>
               </div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                <div className='w-full'>
                    <span className='labelStyles'>Country</span>
                    <Countries />
                </div>

                
  <div className='w-full'>
    <span className='labelStyles'>Currency</span>
    <select className='inputStyles'>
      <option>{selectedCountry?.currency || user?.country}</option>
    </select>
                </div>
            </div>


<div className='w-full flex items-center justify-between pt-10'>
    <div className='' >
        <p className='text-lg text-black dark:text-gray-400 font-semibold'>
            Appearance
        </p>
        <span className='labelStyles'>
            Customize how your theme looks on your device

        </span>
    </div>

    <div className='w-28 md:w-40'>
        <select 
        className='inputStyles'
        defaultValue={theme}
        onChange={(e) => toggleTheme (e.target.value)}
        >
            <option value = 'light' >Light </option>
            <option value='dark'>Dark</option>

        </select>
    </div>

</div>

<div className='w-full flex items-center justify-between pb-10'>
<div>
<p className='text-lg text-black dark:text-gray-400 font-semibold'>Language</p>

<span className='labelStyles'>
    Customize what language you want to use</span>
</div>


<div className='w-28 md:w-40'>
    <select className='inputStyles'>
        <option value='English'>English</option>
    </select>
</div>
</div>


  <div className="mt-10 flex items-center justify-end gap-6 border-b-2 border-gray-200 pb-10 dark:border-gray-800">
          <Button
            variant="outline"
            type="reset"
            disabled={loading}
            className="px-6 bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700"
          >
            Reset
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="bg-violet-800 px-8 text-white"
          >
            {loading ? (
              <BiLoader className="animate-spin text-white" />
            ) : (
              'Save'
            )}
          </Button>
          </div>
    </form>
);
};


