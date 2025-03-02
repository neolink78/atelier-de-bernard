import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import {schema, FormSchema} from '../schemas/ContactsSchemas'
import { post } from '../services/contacts.service'
import { useState } from "react"

const Contact = () => {

    const [errorButton, setErrorButton] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: FormSchema) => {
       const test = await post(data)
       if (test.status === 500) setErrorButton(test.response.data.error)
       else if (errorButton !== null) setErrorButton(null)
    }

    return(
        <div className="mx-5 sm:mx-[12rem] mb-3">
            <p className="flex justify-center text-center w-4xl">Pour toute demande particulière, Veuillez m&apos;envoyer un mail via ce formulaire.
            Sachez qu&apos;un seul mail par adresse ne sera traité. Assurez vous donc de ne rien oublier !</p>
            <form onSubmit={handleSubmit(onSubmit)} className='relative flex flex-col gap-5 sm:gap-10 max-w-sm mx-auto mt-8 px-9 '>
                <div>
                    <label className="flex justify-center sm:block sm:ml-2">Prénom</label>
            <input 
            type="text"
            {...register('firstname')}
           className="border text-sm rounded-lg w-full p-2.5 mt-1"
            />
            {errors.firstname && <p className="absolute mt-1 text-red-500 text-sm">{errors.firstname.message}</p>}
                </div>
                <div>
                    <label className="flex justify-center sm:block sm:ml-2">Nom</label>
            <input 
            type="text"
            {...register('lastname')}
            className="border text-sm rounded-lg w-full p-2.5 mt-1"
            />
            {errors.lastname && <p className="absolute mt-1 text-red-500 text-sm">{errors.lastname.message}</p>}
                </div>
                <div>
                    <label className="flex justify-center sm:block sm:ml-2">Email</label>
            <input 
            type="email"
            {...register('mail')}
            className="border text-sm rounded-lg w-full p-2.5 mt-1"
            />
            {errors.mail && <p className="absolute mt-1 text-red-500 text-sm">{errors.mail.message}</p>}
                </div>
                <div>
                    <label className="flex justify-center sm:block sm:ml-2">Message</label>
           <textarea 
           
           {...register("message")}
           rows={4}
           className="border text-sm rounded-lg w-full p-2.5 mt-1 h-48 resize-none"
           />
            {errors.message && <p className="absolute mt-1 text-red-500 text-sm">{errors.message.message}</p>}
                </div>
                <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >Envoyer
                </button>
                {errorButton && <p className="absolute mt-1 top-full text-red-500 text-sm">{errorButton}</p>}
            </form>
        </div>
    )
}

export default Contact