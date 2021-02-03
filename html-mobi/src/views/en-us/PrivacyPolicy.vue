<template>
    <!-- 注册协议 -->
    <div class="AgreementLayer" @click="doClose()" v-if="isShow" :class="{active: isShow}">
		<div class="AgreementContent" @click.stop=";">
			<header><i @click="doClose()"></i>Privacy Policy</header>
			<div class="content">
				<p class="mt">This Agreement is an agreement between you and the Service Provider EchatAPP regarding the use of any service provided by EchatAPP. Please confirm that you have read, understood, and accepted all of the terms contained herein and the Privacy Policy incorporated into the General Data Protection Regulations (GDPR). As this agreement is legally binding, please read it carefully before using our services. By registering to access and use EchatAPP, you agree to all terms of this Agreement. If you have any objections, please keep your account locked (for existing users) and stop using EchatAPP.</p>
				<p>1、General</p>
				<p>1.1The User Agreement (hereinafter referred to as "this Agreement" or "the Terms and Conditions") consists of the text, the Privacy Policy, and various rules, statements, and descriptions that may be issued by the APP or may be issued in the future.</p>
				<p>1.2You should read this agreement carefully before using the services provided by this app. If you do not understand or other needs, please consult a professional lawyer. If you do not agree to this Agreement and/or modify it at any time, please stop using the services provided by this app immediately or stop using this app. By accessing this app, using any of the services of this app or any other similar behavior, you understand and fully agree to the contents of this agreement, including any modifications made by this APP to this agreement at any time.</p>
				<p>1.3You can become a member of this app (hereinafter referred to as "Member") by completing the relevant information in accordance with the requirements of this app and successfully registering after other relevant procedures. By checking the "Agree" button during the registration process, you are signing by electronic means. In the form of an agreement with the company; or when you click on any button labeled "Agree" or similar in the course of using the App or actually use the services provided by the App in the manner permitted by other APP, you are fully Understand, agree and accept all the terms and conditions of this Agreement, without the written signature of your handwriting, this Agreement has no effect on your legal binding.</p>
				<p>1.4After you become a member of this app, you will get a member account and corresponding password, the member account and password are kept by the member; members should be legally responsible for all activities and events carried out on your account.</p>
				<p>1.5By registering and using any of the services and features provided by this App, you will be deemed to have read, understood and accepted all the terms and conditions of this Agreement:</p>
				<p>1.51 You confirm that you are at least 16 years old and have a legal contractable age under applicable law. Your acceptance of this APP service in the registration, sale or purchase of this APP, information release, etc. shall comply with the jurisdiction of sovereign countries or regions in compliance with relevant laws and regulations, and have sufficient capacity to accept these terms.</p>
				<p>1.52 You acknowledge that the information provided at the time of registration is true and accurate.</p>
				<p>1.53 You agree not to engage in or participate in any act or activity that harms the interests of the APP or the Company at any time, whether or not related to the services provided by the App.</p>
				<p>1.54 This Agreement only binds the rights and obligations between you and us, and does not involve legal relationships and legal disputes between the APP users and other APPs and you.</p>
				
				<p>2．Agreement Revised</p>
				<p>We reserve the right to amend this Agreement from time to time and to make announcements in the form of APP publicity, and to not notify you separately, once it is announced in the APP, it will automatically take effect immediately. You should review and update the update time and update content of this agreement from time to time. If you do not agree with the change, you should immediately stop using the APP service; if you continue to use this APP service, you accept and agree to the revised agreement. .</p>
				
				<p>3．Registration</p>
				<p>3.1 Registration eligibility</p>
				<p>You acknowledge and promise that when you complete the registration process or actually use the services provided by this APP in the manner permitted by this APP, you shall have the applicable legal requirements to sign this Agreement and the ability to use the APP Services. Natural person, legal person or other organization. Once you click the Agree to Register button, you or yourself and your authorized agent have agreed to the content of the agreement and are registered and used by the agent. If you do not have the above qualifications, you and your authorized agent shall bear all the consequences arising therefrom, and the company reserves the right to cancel or permanently freeze your account and to hold you and your authorized agent accountable. </p>
				<p>3.2 Purpose of registration</p>
				<p>You acknowledge and promise that your registration with this APP is not for the purpose of violating laws and regulations.</p>
				<p>3.3 Registration Process</p>
				<p>3.3.1 You agree to provide valid e-mail , mobile phone number and other information according to the requirements of this APP user registration page. You can use this email address, mobile phone number or other methods permitted by this app as your login means to enter this app. If necessary, in accordance with the relevant laws and regulations of different jurisdictions, you must provide relevant information such as your real name, identity documents and other laws and regulations and privacy provisions, and constantly update the registration information, in line with timely, detailed and accurate requirements. All original typed materials will be cited as registration materials. You are responsible for the truthfulness, completeness and accuracy of such information and assume any direct or indirect damages and adverse consequences resulting therefrom.</p>
				<p>3.3.2 If the laws, regulations, rules, orders, etc. of your sovereign country or region have real-name requirements for mobile phone numbers, you agree to provide registered mobile phone numbers that are registered by real-name. If you do not provide them according to regulations, you will be given Any direct or indirect losses and adverse consequences will be borne by you.</p>
				<p>3.3.3 You are legally, complete and valid to provide the information required for registration and have the right to obtain the APP account number and password. If you obtain this APP account and password, you will be deemed to have successfully registered. You can log in to the APP.</p>
				<p>3.3.4 You agree to receive emails and messages related to the management and operation of APP sent by this APP.</p>
				
				<p>4．Service</p>
				<p style="color:#ff0000;">This app only provides online platform services for private chat activities (including but not limited to private chat services) through this app. </p>
				<p>4.1 Service Content</p>
				<p>4.1.1 You have the right to private chat in this app.</p>
				<p>4.1.2 You have the right to view the information under this APP member account in this app, and have the right to apply the functions provided by this app.</p>
				<p>4.1.3 You have the right to participate in the APP activities of organization in accordance with the activity rules published in this App.</p>
				<p>4.1.4 Other services that this app promises to provide you.</p>
				<p>4.2. Service Rules</p>
				<p>You are committed to the following APP service rules:</p>
				<p style="color:#ff0000;">4.2.1 You shall abide by the laws, regulations, rules, and policy requirements, and may not engage in illegal or other activities that damage the rights of this APP or third parties in this APP or use this APP service, such as sending or receiving any illegal, illegal or infringing Information about the rights and interests of others, sending or receiving pyramid schemes or other harmful information or statements, without the authorization of this APP or forging the header information by using the email of this APP.</p>
				<p>4.2.2 You should abide by laws and regulations and properly use and keep your APP account and login password, fund password, mobile phone number bound to the registration, and the mobile phone verification code received by the mobile phone. You are solely responsible for any operations and consequences of using this APP account and login password, mobile phone verification code. When you find that the APP account, login password, or verification code is used by a third party that is not authorized by you, or if there are other account security issues, you should immediately notify the APP and request the APP to suspend the service of this APP account. This app has the right to take action on your request within a reasonable time, but this app does not assume any responsibility for the consequences (including but not limited to any loss) that you have incurred before taking action. You may not give, lend, rent, transfer or otherwise give this APP account to others without the consent of this app.</p>
				<p>4.2.3 You agree that you shall take responsibility for all activities (including but not limited to information disclosure, posting information, online click consent or submitting various rule agreements, online renewal agreements or purchasing services) of your APP's account number and password. </p>
				<p>4.2.4 When using this app, you may not interfere with the normal operation of this APP or interfere with the use of this APP by other users by any technical means or other means; you may not maliciously destroy the goodwill of this APP by fictitious facts.</p>
				<p>4.2.5 If you have a dispute with other users due to online transactions, you can not request this APP to provide relevant materials
					except judicial or administrative means.</p>
				<p>4.2.6 In the course of using the services provided by this APP, the taxable value generated, as well as all hardware, software, service and other expenses, shall be judged and assumed by you.</p>
				<p>4.2.7 You shall abide by this Agreement and other terms of service and operating rules that are posted and updated from time to time by this APP, and you have the right to terminate the use of the services provided by this APP at any time.</p>
				<p>5．The rights and obligations of App</p>
				<p>5.1 If you do not have the registration qualification as stipulated in this agreement, this APP has the right to refuse your registration. For the registered, this APP has the right to cancel your membership account. This APP reserves the right to investigate with you or your authorized agent. The right to responsibility. At the same time, this app reserves the right to decide whether or not to accept your registration under any other circumstances.</p>
				
				<p>5.2 This APP finds that the user of the account is not the initial registrant of the account and has the right to suspend or terminate the use of the account.</p>
				<p>5.3 This App has the right to notify you of corrections, update information or suspend or terminate the provision of this APP service through technical testing, manual sampling and other means of detection, if you reasonably suspect that the information you provided is incorrect, false, invalid or incomplete.</p>
				<p>5.4 The APP reserves the right to correct the information when it finds any obvious error in any information displayed on this APP.</p>
				<p>5.5 This app reserves the right to modify, suspend or terminate this APP service at any time. The right of this APP to modify or suspend the service does not need to inform you in advance; this APP terminates one or more services of this APP, and terminates from this APP in APP. Effective on the date of publication of the termination notice.</p>
				<p>5.6 The APP shall take necessary technical means and management measures to ensure the normal operation of the APP, and provide necessary and reliable environment and services to maintain the APP usage level.</p>
				<p>5.7 If you have not used this APP member account and password to log in to this app for one year, this app has the right to cancel your APP account. After the account is cancelled, the APP has the right to open the corresponding member name to other registrants.</p>
				<p>5.8 This APP protects your account by strengthening technical investment, improving security and other measures. It is obliged to notify you in advance when there is a foreseeable security risk in your account.</p>
				<p>5.9 The APP reserves the right to delete any content in the APP that does not comply with laws and regulations or the provisions of this APP. The APP does not need to notify you in advance.</p>
				<p>5.10 The APP has the right to request more information or materials according to the laws, regulations, rules, orders and other requirements of your sovereign country or region, and take reasonable measures to meet the requirements of local regulations. Obligation to cooperate; this APP has the right to suspend or permanently stop opening the APP and some or all of its services according to the requirements of the laws, regulations, rules and orders of your sovereign country or region.</p>
				
				<p>6．Compensation</p>
				<p>In the event of any violation of this Agreement, or in violation of applicable laws, regulations or third parties' rights during the use of EchatAPP Services. You agree to indemnify EchatAPP and its affiliates, contractors, licensors and their respective directors, officers, employees and agents from claims and damages (including attorneys' fees, fines or penalties imposed by the regulatory authorities).</p>
				
				<p>7．Limitation of Liability and Disclaimer</p>
				<p>7.1 You understand and agree that under no circumstances will we be liable for the following:</p>
				<p>7.1.1 Loss of income</p>
				<p>7.1.2 Trading profit or contract loss</p>
				<p>7.1.3 Business interruption</p>
				<p>7.1.4 loss of information</p>
				<p>7.1.5 Loss of opportunity, goodwill or reputation</p>
				<p>7.1.6 Data corruption or loss</p>
				<p>7.1.7 Cost of purchasing an alternative product or service</p>
				<p>7.1.8 Any indirect, special or incidental loss or damage arising from infringement (including negligence), breach of contract or any other reason, and whether such loss or damage can be reasonably foreseen by us; unless we are prior To the possibility of a potential loss or loss.</p>
				<p>Articles 7.1.1 to 7.1.8 are independent of each other.</p>
				<p>7.2 You understand and agree that we shall not be liable for any damages resulting from any of the following:</p>
				<p>7.2.1 We have reasonable grounds to believe that your actions in this APP are suspected of being illegal or immoral.</p>
				<p>7.2.2 Fees and losses arising from the purchase or acquisition of any data, information or transactions, or alternative actions through the APP Services.</p>
				<p>7.2.3 Your misunderstanding of this APP service.</p>
				<p>7.2.4 Any other loss related to the services provided by this APP caused by our reasons.</p>
				<p>7.3 We are concerned with the failure of information network equipment maintenance, information network connection failure, computer, communication or other system failures, power failures, weather causes, accidents, strikes, labor disputes, riots, uprisings, disturbances, lack of productivity or production materials, fires , floods, storms, explosions, wars, bank or other partner reasons, government actions, judicial or administrative orders, other inactions that are beyond our control or that we are unable to control or third parties We do not accept any responsibility for delaying the service and your losses.</p>
				<p>7.4 We cannot guarantee that all the informations, programs, texts, etc. contained in this app are completely safe and free from any malicious programs such as viruses and Trojans. Therefore, you can log in, use any service of this app or download and use any program downloaded. , information, data, etc. are your personal decisions and bear the risks and possible losses.</p>
				<p>7.5 We do not make any guarantees or promises to any information, products and services of any third-party APP linked in this app and any other content that is not our subject, if you use any services or information provided by third-party apps. And the products are all determined by you and bear all responsibility arising therefrom.</p>
				<p>7.6 We make no warranties, express or implied, regarding your use of the App Services, including but not limited to the suitability of the services provided by the App, without errors or omissions, continuity, accuracy, reliability, and for a particular purpose. At the same time, we do not make any commitment or guarantee for the validity, accuracy, correctness, reliability, quality, stability, completeness and timeliness of the technology and information involved in the services provided by this APP. It is your personal decision to log in or use the services provided by this app and bear the risks and possible losses.</p>
				<p>7.7 Our warranties and undertakings set forth in this Agreement are the sole warranties and representations of the Services provided by us in connection with this Agreement and this APP, and supersedes any other warranties and undertakings, whether written or oral, Express or implied. All such warranties and representations represent our own commitments and warranties and do not guarantee that any third party will comply with the warranties and undertakings in this Agreement.</p>
				<p>7.8 We do not waive any restrictions on our ownership that are not mentioned in this Agreement to the fullest extent applicable to the law, and waive or offset any of our rights to damages.</p>
				<p>7.9 By signing up, you acknowledge that any action taken by us in accordance with the rules set forth in this Agreement is at your own risk.</p>
				
				<p>8．Termination of agreement</p>
				<p>8.1 The APP has the right to cancel your APP account in accordance with the terms of this agreement. This agreement is terminated on the date of cancellation of the account.</p>
				<p>8.2 The APP has the right to terminate all of the APP services in accordance with the terms of this Agreement. This Agreement is terminated on the date of termination of all services of the APP.</p>
				<p>8.3 After the termination of this Agreement, you are not entitled to request that the APP continue to provide any services or perform any other obligations, including but not limited to requiring the APP to retain or disclose to you any information in its original APP account, or The third party forwards any information it has not read or sent, and so on.</p>
				<p>8.4 The termination of this Agreement does not affect the commitment of the defaulting party to the breach of contract.</p>
				
				<p>9．Intellectual Property</p>
				<p>9.1 All intellectual achievements included in this app include, but are not limited to, APP logo, database, APP design, text and graphics, software, photos, videos, music, sound and combinations thereof, software compilation, related source code and software (including small The intellectual property rights of the application and script are owned by this app. You may not copy, alter, copy, transmit or use any of the foregoing materials or content for commercial purposes.</p>
				<p>9.2 All rights (including but not limited to goodwill and trademarks, logos) contained in the APP's name are owned by the company.</p>
				<p>9.3 Your acceptance of this Agreement shall be deemed to be your copyright in any form of informations published by you in this APP, including but not limited to: reproduction rights, distribution rights, rental rights, exhibition rights, performance rights, screening rights, broadcasting rights, Information network communication rights, filming rights, adaptation rights, translation rights, compilation rights, and other transferable rights that should be enjoyed by the copyright owner are exclusively and freely transferred to this APP. This APP has the right to file a lawsuit and obtain full compensation for any subject infringement. . The validity of this Agreement and the content of any work protected by the Copyright Law that you post in this APP, whether formed before the signing of this Agreement or after the signing of this Agreement.</p>
				<p>9.4 You may not illegally use or dispose of the intellectual property rights of this APP or others during the use of this APP service. You may not post or authorize the use of other APP (and media) in any form.</p>
				<p>9.5 You are not deemed to have transferred any intellectual property rights to you by accessing this app or using any of the services provided by this App.</p>
				
				<p>10．Information protection</p>
				<p>10.1 Scope of application</p>
				<p>10.1.1 Personal registration information provided by you in accordance with the requirements of this App, including but not limited to phone number, Email information, ID card information, when you register for an APP account or use an account.</p>
				<p>10.1.2 When you use this app service, the app automatically receives and records the server values on your browser, including but not limited to IP address and other data and the records you request.</p>
				<p>10.1.3 Other personal informations obtained by this APP through legal channels.</p>
				<p>10.2 Information usage</p>
				<p>10.2.1 You do not need your additional consent. If you register successfully in this app, you agree that this APP collects and uses all kinds of information in this app, as listed in 11.1. You understand and agree that this app can The information you collect is used for but not limited to the following purposes:</p>
				<p>10.2.1.1 Provide you with this APP service;</p>
				<p>10.2.1.2 Report to relevant departments based on the requirements of relevant authorities of sovereign countries or regions;</p>
				<p>10.2.1.3 When you use this APP service, this app uses your information for authentication, customer service, security, fraud monitoring, marketing, archiving and backup purposes, or to cooperate with third parties to promote APP and other legitimate purposes. Ensure the security of the products and services provided by this APP;</p>
				<p>10.2.1.4 Help the APP to design new products and services and improve the information collection and arrangement of the existing services of the APP;</p>
				<p>10.2.1.5 In order to let you know the specifics of this APP service, you agree that this APP will send marketing notices, commercial electronic information and advertisements related to you to replace the commonly used advertisements;</p>
				<p>10.2.1.6 This APP transfers or discloses your information to any non-associated third party for the purpose of completing the merger, division, acquisition or transfer of assets;</p>
				<p>10.2.1.7 Software certification or management software upgrade;</p>
				<p>10.2.1.8 Invites you to participate in the investigation of this APP service;</p>
				<p>10.2.1.9 Data analysis for cooperation with government agencies, public affairs agencies, associations, etc.;</p>
				<p>10.2.1.10 Used for all other lawful purposes and for other purposes authorized by you.</p>
				<p>10.2.2 This app does not sell or lend your personal information to anyone else unless you have your permission in advance. This app also does not allow any third party to collect, edit, sell or distribute your personal information by any means.</p>
				<p>10.3 This APP shall keep confidential the information on the customer's identity information obtained, and shall not provide any identity information to any unit or individual, except for those provided by the APP in accordance with the laws, regulations, decrees, orders, etc. of the relevant sovereign state or region.</p>
				
				<p>11．Calculation</p>
				<p>All transaction calculation results have been verified by us, and all calculation methods have been published on the APP, but we cannot guarantee that the use of the APP will not be interfered or error-free.</p>
				
				<p>12．Transfer</p>
				<p>The rights and obligations stipulated in this Agreement also govern the assignee, heir, executor and administrator of the parties who have obtained the benefits from the rights and obligations. You may not assign to any third party without our consent, but we may at any time transfer our rights and obligations under this Agreement to any third party and give you 30 days notice in advance.</p>
				<p>13．Severability</p>
				<p>If any provision of this Agreement is deemed unenforceable, invalid or illegal by any court of competent jurisdiction, it does not affect the validity of the remaining provisions of this Agreement.</p>
				
				<p>14．Non-agent relationship</p>
				<p>Nothing in this Agreement shall be deemed to create, imply or otherwise treat us as your agent, trustee or other representative, except as otherwise provided in this Agreement.</p>
				
				<p>15．Abstain</p>
				<p>The waiver of any liability by us or any of you for breach of contractual liability or other liability as set forth in this Agreement shall not be construed or construed as a waiver of any breach of contract; any failure to exercise any right or remedy shall not be construed in any way as such right or relief. give up.</p>
				
				<p>16．Title</p>
				<p>All headings are for convenience only and are not intended to extend or limit the content or scope of the terms of the agreement.</p>
				<p>17．Effectiveness and interpretation of the agreement</p>
				<p>17.1 This Agreement is effective when you click the consent registration of this APP registration page and complete the registration process, obtain the APP account and password, and bind to this APP and you.</p>
				<p>17.2 The final interpretation of this Agreement is the property of this APP.</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    name: 'Agreement',
    data ()
    {
      return {
		  isShow:false,
      }
    },
    methods: {
		show() {
			this.isShow = true;
		},
		doClose() {
			this.isShow = false;
		},
    },
    mounted(){}
}
</script>
<style lang="scss">
	@import "@/assets/css/agreement.scss"; 
</style>
