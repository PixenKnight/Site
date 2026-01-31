import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/contact')({
	component: RouteComponent,
})

function RouteComponent() {
	// Required for submission
	const [ allowSubmit, setAllowSubmit ] = useState(false)
	const [ name, setName ] = useState('')
	const [ nameTouched, setNameTouched ] = useState(false)
	const [ nameValid, setNameValid ] = useState(false)
	const [ email, setEmail ] = useState('')
	const [ emailTouched, setEmailTouched ] = useState(false)
	const [ emailValid, setEmailValid ] = useState(false)
	const [ msg, setMsg ] = useState('')
	const [ msgTouched, setMsgTouched ] = useState(false)
	const [ msgValid, setMsgValid ] = useState(false)

	// Validated, but does not block submission
	const [ phone, setPhone ] = useState('')
	const [ phoneTouched, setPhoneTouched ] = useState(false)
	const [ phoneValid, setPhoneValid ] = useState(true)

	const [ preferredContact, setPreferredContact ] = useState('email')

	useEffect(() => {
		setNameValid(name.length > 0)
	}, [name, nameTouched])

	useEffect(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		setEmailValid(emailRegex.test(email) && email.length > 0)
	}, [email, emailTouched])

	useEffect(() => {
		setMsgValid(msg.length > 0)
	}, [msg, msgTouched])

	useEffect(() => {
		const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?(\d[-.\s]?){6,9}\d$/
		if (phone.length === 0) {
			setPhoneValid(true)
		} else {
			setPhoneValid(phoneRegex.test(phone))
		}
	}, [phone, phoneTouched])

	useEffect(() => {
		if (nameValid && emailValid && msgValid) {
			setAllowSubmit(true)
		} else {
			setAllowSubmit(false)
		}
	}, [nameValid, name, emailValid, email, msgValid, msg])

	const validInputLabel = (validVar: boolean, touchedVar: boolean) => {
		if (validVar || !touchedVar) {
			return "mb-2 text-xl font-bold text-gray-300"
		} else {
			return "mb-2 text-xl font-bold text-red-500"
		}
	}

	const mixedInputLabel = (errorVar: boolean, touchedErrorVar: boolean, warningVar: boolean, touchedWarningVar: boolean) => {
		let className = "mb-2 text-xl font-bold "
		if (!errorVar && touchedErrorVar) {
			className += "text-red-500 "
		} else if (!warningVar && touchedWarningVar) {
			className += "text-yellow-500 "
		} else {
			className += "text-gray-300 "
		}
		return className
	}

	const validInputBox = (validVar: boolean, touchedVar: boolean) => {
		if (validVar || !touchedVar) {
			return "flex-1 p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500"
		} else {
			return "flex-1 p-3 rounded-lg bg-gray-700 text-gray-200 border border-red-500 focus:outline-2 focus:outline-offset-2 focus:outline-red-500 focus:border-transparent"
		}
	}

	const warningInputBox = (validVar: boolean, touchedVar: boolean) => {
		if (validVar || !touchedVar) {
			return "flex-1 p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500"
		} else {
			return "flex-1 p-3 rounded-lg bg-gray-700 text-gray-200 border border-yellow-500 focus:outline-2 focus:outline-offset-2 focus:outline-yellow-500 focus:border-transparent"
		}
	}

	return (
		<div className="min-h-[calc(100vh-72px-68px)] bg-gray-950 via-slate-800 to-slate-900 pb-6">
			<section className="max-w-4xl mx-auto h-min p-8 text-gray-200 ">
				<div className="relative text-center">
					<h1 className="text-5xl md:text-7xl font-black text-white [letter-spacing:-0.01em] transform duration-300 ease-in-out motion-safe:hover:-translate-y-1 mb-2">
						<span className="text-gray-200">Contact</span>{' '}
						<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Me</span>
					</h1>
					<p>If you'd like to get in touch, please leave your contact information below! I'll reach out as soon as possible.</p>
					<p>Whether it's for professional inquiries, collaborations, or just to say hello, I'm excited to hear from you!</p>
					<br/>
					<p>Form submissions are handled by the good folks at <a href="https://formsubmit.co/" target="_blank" className="text-cyan-400 hover:underline">FormSubmit</a>. Apologies if your message gets filtered by their spam protection.</p>
				</div>
			</section>
			<section className="max-w-4xl md:mx-auto mx-4 p-8 bg-gray-800 rounded-lg shadow-lg relative z-10">
				<form
					action="https://formsubmit.co/331aea2cbe5fd9355b7df06e1a2e5456"
					method="POST"
					className="flex flex-col gap-6 mb-0"
				>
					<div className="flex flex-col" id="name-div">
						<label
							htmlFor="name"
							className={`${validInputLabel(nameValid, nameTouched)}`}
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Your Name"
							required
							title={"Please enter your name." + (nameTouched && !nameValid ? " This field is required." : "")}
							value={name}
							onChange={(e) => setName(e.target.value)}
							onBlur={(_) => setNameTouched(true)}
							className={`${validInputBox(nameValid, nameTouched)}`}
						/>
					</div>
					<div className="flex flex-col" id="pronouns-div">
						<label
							htmlFor="pronouns"
							className="mb-2 text-xl font-bold text-gray-300"
						>
							Pronouns (optional)
						</label>
						<input
							type="text"
							id="pronouns"
							name="pronouns"
							placeholder="e.g., they/them, she/her, he/him..."
							className="flex-1 p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500"
						/>
					</div>
					<div className="flex flex-col" id="contact-div">
						<label
							htmlFor="contact"
							className={`${mixedInputLabel(emailValid, emailTouched, phoneValid, phoneTouched)}`}
						>
							Contact Information
						</label>
						<div className="flex space-x-4 not-md:gap-5 not-md:flex-col">
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Email Address"
								required
								title={"Please enter your email address." + (emailTouched && !emailValid ? " This field is required and must be a valid email address." : "")}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={(_) => setEmailTouched(true)}
								className={`${validInputBox(emailValid, emailTouched)} not-md:w-full`}
							/>
							<input
								type="tel"
								id="phone"
								name="phone"
								placeholder="Phone Number (optional)"
								title={"Please enter your phone number." + (phoneTouched && !phoneValid ? " Due to the amount of possibilities for valid numbers, I'm only warning you that this phone MAY not be correct. If you're sure this number is correct, please proceed." : "")}
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								onBlur={(_) => setPhoneTouched(true)}
								className={`${warningInputBox(phoneValid, phoneTouched)} not-md:w-full`}
							/>
						</div>
						{email.length > 0 && phone.length > 0 && (
							<div className="mt-4">
								<label
								htmlFor="contact-preferred"
								className="text-sm text-gray-400 mr-2"
								>
									What's the best way to reach you?
								</label>
								<div className="inline-block ml-4 hover:cursor-pointer" onClick={() => setPreferredContact('email')}>
									<input
										type="radio"
										id="contact-preferred-email"
										name="contact-preferred"
										value="email"
										className="mr-2 checked:inset-ring-3 checked:inset-ring-cyan-500 bg-white appearance-none rounded-full w-3 h-3 hover:outline-cyan-500 hover:outline-2 hover:outline-offset-2 hover:cursor-pointer"
										checked={preferredContact === 'email'}
										onChange={() => setPreferredContact('email')}
									/>
									<label
										htmlFor="contact-preferred-email"
										className="mr-4 text-gray-300 hover:cursor-pointer"
									>
										Email
									</label>
								</div>
								<div className="inline-block ml-4 hover:cursor-pointer" onClick={() => setPreferredContact('phone')}>
									<input
										type="radio"
										id="contact-preferred-phone"
										name="contact-preferred"
										value="phone"
										className="mr-2 checked:inset-ring-3 checked:inset-ring-cyan-500 bg-white appearance-none rounded-full w-3 h-3 hover:outline-cyan-500 hover:outline-2 hover:outline-offset-2 hover:cursor-pointer"
										checked={preferredContact === 'phone'}
										onChange={() => setPreferredContact('phone')}
									/>
									<label
										htmlFor="contact-preferred-phone"
										className="text-gray-300 hover:cursor-pointer"
									>
										Phone
									</label>
								</div>
							</div>
						)}
					</div>
					<div className="flex flex-col" id="message-div">
						<label
							htmlFor="message"
							className={`${validInputLabel(msgValid, msgTouched)}`}
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							rows={6}
							placeholder="Reason for contact, questions, or additional information..."
							required
							title={"Please enter your message." + (msgTouched && !msgValid ? " This field is required." : "")}
							value={msg}
							onChange={(e) => setMsg(e.target.value)}
							onBlur={(_) => setMsgTouched(true)}
							className={`${validInputBox(msgValid, msgTouched)}`}
						></textarea>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							disabled={!allowSubmit}
							className="px-6 py-3 bg-cyan-600 hover:not-disabled:bg-cyan-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Send Message
						</button>
					</div>
					{/* Hidden fields for FormSubmit */}
					<input type="hidden" className="appearance-none" name="_autoresponse" value="Thank you for submitting your contact information! I'll get back to you as soon as possible. In the meantime, here's a copy of your submission."/>
					<input type="hidden" className="appearance-none" name="_template" value="table"/>
					<input type="hidden" className="appearance-none" name="_replyto"/>
					<input type="hidden" className="appearance-none" name="_subject" value={`Contact Request from ${name}`}/>
					<input type="text" className="appearance-none h-0 absolute" name="_honey"/>
				</form>
			</section>
		</div>
)
}
