import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import {schema, FormSchema} from '../schemas/ContactsSchemas'
import { post } from '../services/contacts.service'
import { useState } from "react"
import { getStaticPropsWithTranslations } from '@/hoc/serverSideProps';
import { useTranslation } from "next-i18next";
import { ToastContainer, toast } from "react-toastify";

export const getStaticProps = getStaticPropsWithTranslations()

const Contact = () => {
    const { t } = useTranslation('contact')
    const [errorButton, setErrorButton] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (values: FormSchema) => {
       const {response, status}: any = await post(values)
       if (status === 500) setErrorButton(response.data.error)
       else if (errorButton !== null) setErrorButton(null)
    if (status === 200) toast.success(t("contact_message_sent"), {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: false,
        theme: "dark",
        });
    }

    return(
        <div className="mx-5 sm:mx-[12rem] mb-3">
            <p className="flex justify-center text-center w-4xl">{t("contact_header")}</p>
            <form onSubmit={handleSubmit(onSubmit)} className='relative flex flex-col gap-5 sm:gap-10 max-w-sm mx-auto mt-8 px-9'>
                <div>
                    <label htmlFor="firstname" className="flex justify-center sm:block sm:ml-2">{t('contact_name')}</label>
            <input 
            id="firstname"
            type="text"
            {...register('firstname')}
            className="border text-sm rounded-lg w-full p-2.5 mt-1 text-black" 
            />
            {errors.firstname && <p className="absolute mt-1 text-red-900 text-sm">{t(errors.firstname.message as string)}</p>}
                </div>
                <div>
                    <label htmlFor="lastname" className="flex justify-center sm:block sm:ml-2">{t("contact_lastname")}</label>
            <input 
            id="lastname"
            type="text"
            {...register('lastname')}
            className="border text-sm rounded-lg w-full p-2.5 mt-1 text-black"
            />
            {errors.lastname && <p className="absolute mt-1 text-red-900 text-sm">{t(errors.lastname.message as string)}</p>}
                </div>
                <div>
                    <label htmlFor="mail" className="flex justify-center sm:block sm:ml-2">Email</label>
            <input 
            id="mail"
            type="email"
            {...register('mail')}
            className="border text-sm rounded-lg w-full p-2.5 mt-1 text-black"
            />
            {errors.mail && <p className="absolute mt-1 text-red-900 text-sm">{t(errors.mail.message as string)}</p>}
                </div>
                <div>
                    <label htmlFor="message" className="flex justify-center sm:block sm:ml-2">Message</label>
           <textarea 
           id="message"
           {...register("message")}
           rows={4}
           className="border text-sm rounded-lg w-full p-2.5 mt-1 h-48 resize-none text-black"
           />
            {errors.message && <p className="absolute mt-1 text-red-900 text-sm">{t(errors.message.message as string)}</p>}
                </div>
                <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >{t('contact_button')}
                </button>
                {errorButton && <p className="absolute mt-1 top-full text-red-900 text-sm">{t(errorButton)}</p>}
            </form>
            <ToastContainer />
        </div>
    )
}

export default Contact