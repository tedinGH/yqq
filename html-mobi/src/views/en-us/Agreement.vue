<template>
    <!-- 注册协议 -->
    <div class="AgreementLayer" @click="doClose()" v-if="isShow" :class="{active: isShow}">
		<div class="AgreementContent" @click.stop=";">
			<header><i @click="doClose()"></i>User Agreement</header>
			<div class="content">
				<p><b>EchatAPP software license and service agreement</b></p>
				<p>[First and introduction]</p>
				<p>Welcome to use our software and services!</p>
				<p>To use the software, Inc. (collectively, the "software") and the services (collectively, the "services"), you should read and comply with the EchatAPP software license and service agreement (collectively, the "agreement"). Please be sure to carefully read and fully understand the contents of the terms, especially the terms that exempt or restrict the liability of the software, the terms that restrict the rights of users, the terms that stipulate dispute resolution and jurisdiction (such as article 15), and the separate agreements for the opening or use of a service. Restrictions, disclaimers or other provisions involving your material rights and interests may be in bold, underlined form to remind you to pay attention.</p>
				<p>You have no right to download, install or use the software and/or related services unless you have fully read, fully understood and accepted all the terms and conditions of this agreement. If you click "agree", "next" or your download, installation, use, login or any other express or implied way of acceptance of this agreement, you shall be deemed to have read and agreed to the restrictions of this agreement. This agreement shall have legal effect between you and the software and shall become a legal document binding on both parties.</p>
				<p>If you do not have full capacity for civil conduct due to your age, intelligence or other factors please read and judge whether you agree to this agreement with your legal guardian (hereinafter referred to as the "guardian").</p>
				<p>You should sign or enforce this agreement and use the service in accordance with the laws of your country and / or region.</p>
				<p>1. [Scope of agreement]</p>
				<p>1.1 This agreement is an agreement between you and the software regarding your download, installation, use, login to the software and use of the service.</p>
				<p>1.2 The content of this agreement, including but not limited to the following related to the software and/or the service agreement, rules, norms, and this software may be constantly released about this software and/or the service agreement, rules, specifications, such as content, once released, the content is an integral part of this agreement, and constitute a unified whole, you also should abide by.</p>
				<p>2. [About the software and the service]</p>
				<p>2.1 The software refers to the
					EchatAPP software developed by the software Co. Ltd. and authorized by the company to download, install and use according to the agreement.</p>
				<p>2.2 You acknowledge and agree that the software company may update or adjust the content of the software and/or the services as required.</p>
				<p>2.3 You may use the service in the form of client through computer, mobile phone and other terminals. The specific information provided by our company shall prevail. At the same time, the software will continue to enrich your use of the service terminal form, etc. When you use the service, you should choose the software version matching your terminal, system, etc., otherwise, you may not be able to use the service normally.</p>
				<p>2.4 The software gives you a personal, non-transferable and non-exclusive license to use the software to the extent and manner limited by the rules of this agreement.</p>
				<p>2.4.1 You can download, install, use and log in the software on the official website or App Store.</p>
				<p>2.4.2 All other rights not expressly authorized by this clause and other provisions of this agreement shall remain with the software company limited, and you shall obtain the written permission of the software company limited in exercising these rights. Failure by the company to exercise any of the foregoing rights does not constitute a waiver of such rights.</p>
				<p>3. [EchatAPP ID]</p>
				<p>Use this software you need to register EchatAPP ID, and should comply with EchatAPP privacy coup. If your registered EchatAPP ID has not been logged in or used for a long time, the software Co. Ltd. has the right to recycle the EchatAPP ID, and you will not be able to continue to use the corresponding number.</p>
				<p>4. [Acquisition of software]</p>
				<p>4.1 you can obtain the software directly from the official website of the software, as well as the third-party website of EchatAPP and the application distribution platform.</p>
				<p>4.2 If you obtain the software or the installation program with the same name as the software from a third party without EchatAPP, the software Co. Ltd., cannot guarantee the normal use of the software and shall not be responsible for any losses caused thereby.</p>
				<p>5. Installation and uninstallation of software</p>
				<p>5.1 The software co., ltd. may develop different software versions for different terminals and systems, and you should choose the appropriate version to download and install according to the actual situation.</p>
				<p>5.2 After downloading the installation program, you need to follow the steps prompted by the program to install it correctly.</p>
				<p>5.3 Due to the arrangement or adjustment of business strategy, the specific service content available to users in different regions may vary, and the specific service content actually provided by the software Co. Ltd. shall prevail.</p>
				<p>5.4 If you no longer need to use the software or need to install a new version of the software, Uninstall yourself. If you would like to help the software improve product services, please provide comments in the feedback.</p>
				<p>6. [Software update]</p>
				<p>6.1 In order to enhance the user experience and improve the service content, the software may make continuous efforts to develop new services and provide you with software updates from time to time.</p>
				<p>6.2 For the purpose of improving user experience, improving service security and ensuring the consistency of functions, it is entitled to update the software or change some functions and effects of the software and service contents.</p>
				<p>6.3 After the release of the new version of the software, the old version of the software may not be available. The software does not guarantee that the old version of the software will continue to be available, nor do you guarantee to continue to provide the corresponding customer service and maintenance services for the old version of the software, please check and download the latest version at any time.</p>
				<p>7. [Protection of user's personal information]</p>
				<p>7.1 Protection of users' personal information is a basic principle of the software. The software will collect, use, store and share your personal information in accordance with this agreement and EchatAPP privacy coup. If there is no explicit provision in this agreement regarding the protection of personal information, the content of EchatAPP privacy coup shall prevail.</p>
				<p>7.2 You may need to fill in some necessary information when registering an account or using the service. If national laws and regulations ("laws and regulations" in this agreement refers to the user belongs to/region and country the current effective laws, administrative regulations and judicial interpretations, local regulations, local regulations, departmental rules and other regulatory documents as well as to such laws and regulations from time to time to modify and supplement, as well as the related policy, the same below.) If there are special regulations, you need to fill in the real identity information (including but not limited to mobile phone number and other information). If the information you fill in is incomplete or untrue, you may not be able to use the service or may be restricted in use.</p>
				<p>7.3 Under normal circumstances, you may browse and modify the information submitted by yourself according to relevant product rules. However, due to security and identification (such as number appeal service), you may not be able to modify the initial registration information and other verification information provided at the time of registration.</p>
				<p>7.4 The software will use various security technologies and procedures to establish a sound management system to protect your personal information from unauthorized access, use or disclosure.</p>
				<p>7.5 The software will not transfer or disclose your personal information to any third party, unless:</p>
				<p>(1) Requirements of relevant laws and regulations or judicial and administrative authorities; or</p>
				<p>(2) Transfer in order to complete merger, division, acquisition or asset transfer; or</p>
				<p>(3) Necessary to provide the services you requested.</p>
				<p>(4) Circumstances that may be transferred or disclosed to any third party pursuant to EchatAPP privacy coup or other relevant agreement rules.</p>
				<p>7.6 The company attaches great importance to the protection of minors' personal information. If you do not have full capacity for civil conduct, you should obtain the consent of your guardian before using the service.</p>
				<p>8. [Code of user behaviour]</p>
				<p>8.1 [Precautions for users]</p>
				<p>You fully understand and agree that:</p>
				<p>8.1.1 For the purpose of providing you with better services or maintaining software security, the software will obtain and use your relevant information in accordance with the "legal, necessary and proper" principle stipulated by laws and regulations. For example: this software can query your submitted public personal information, in order to facilitate friends and you chat, will obtain and display your device information, network status, etc. You should be aware that the disclosure and disclosure of information in this section may cause potential risks to you and assume the risks arising therefrom.</p>
				<p>8.1.2 You when using the services of a specific function, the software Co. Ltd., you can use the terminal equipment of the relevant permissions, interface and related information in order to realize the corresponding function, certain features may still need to agree to a separate agreement, rules, etc., please read it carefully before you use the function, rules, the related agreement.</p>
				<p>8.1.3 You may choose not to provide some of your information to the software, or cancel the right of the software to collect some information according to the product Settings, but the relevant service functions may not be realized.</p>
				<p>8.1.4 The software will use its reasonable commercial efforts to ensure the security of your data storage in the service, but the software cannot provide a complete guarantee, including but not limited to the following situations:</p>
				<p>(1) The software Co. Ltd. is not responsible for the failure of deletion or storage of relevant data in the software and/or the service due to any reason other than the software.</p>
				<p>(2) You shall backup the data and information stored in the software and/or the service or the data and information related to the software and/or the service by yourself, and if otherwise agreed by the parties, the relevant agreement shall be executed.</p>
				<p>(3) If you cease to use the software and/or the service, or if you are cancelled or terminated from using the service due to your violation of laws and regulations or this agreement, the software company limited has the right to permanently delete your number from the server. After the termination, termination or cancellation of your services, the software Co. Ltd. has no obligation to return any data to you.</p>
				<p>8.1.5 When you use the service, the content of the service may vary according to the software version you use. You understand when you are in some versions of the use of this software are open or the development of this software Co. Ltd., the application of the distributed products or application class distribution function of relevant pages, the application of distributed to better provide you with products or function and terminal equipment upgrade tips on the application of the relevant service, may use or to show you to your friends use application information terminal equipment.</p>
				<p>8.1.6 Based on user experience, operation safety of the software or the relevant service platform, rules and requirements of the platform, healthy development and other comprehensive factors, the software has the right to choose the objects to provide services, determine function Settings, determine function openness, data interface and the objects and scope of related data disclosure. The company has the right to suspend or terminate the provision of relevant services, including but not limited to:</p>
				<p>(1) Violation of laws and regulations or this agreement.</p>
				<p>(2) Affecting service experience.</p>
				<p>(3) There are safety risks.</p>
				<p>(4) It is similar or identical to the main functions or functional components of the software or its service platform, or it can realize the main functions or functional components mentioned above.</p>
				<p>(5) The interface, style, function, description or user experience are similar to the software or its service platform, which may cause the software to believe that the functions or services used by the software come from the software or are authorized by the software.</p>
				<p>(6) Inducement of users to share: means to induce users to share any commercial or non-commercial information of users, companies or institutions in the software and/or the service through various forms of rewards, including but not limited to: inviting friends can increase a lottery opportunity, etc., the same below.</p>
				<p>(7)  Coerced and incited users to share: means to coerce and induce users to share with exaggerated or cursing words, including but not limited to:  "please kindly forward", "life after forwarding", "turn crazy", "must repost", etc. the same below.</p>
				<p>(8) Illegally obtain user data and information: Without the consent of the user explicitly and disclose the data to the users of the purpose and scope of use of related information under the situation of reproduction, storage, use or transfer of user data, including but not limited to require users to share personal information (phone number, date of birth, etc.) can use its functionality, or collect user password or personal information (including but not limited to, phone number, address, id number, birthday, etc.), or without the written permission of the software By this software and/or the service to collect, store, grab, or require the user to provide, including but not limited to, EchatAPP, the context of the information service platform, user data such as the software that belong to the category of sensitive information data (including but not limited to EchatAPP account, customer relationship chain, buddy list data, bank account Numbers and passwords, etc.), or be sure to provide all of the foregoing data obtained on its own or its users, customers used to create the relationship chain, supplement or maintain itself.</p>
				<p>(9) Violate the operation principles of EchatAPP or its service platform, or fail to meet other management requirements of the software.</p>
				<p>8.2 [User prohibited behaviour]</p>
				<p>During the use of the software and/or the service, you shall abide by relevant laws and regulations, user agreements, rules and regulations, and shall not engage in, or facilitate, any of the following:</p>
				<p>8.2.1 ACTS prohibited by laws and regulations</p>
				<p>You shall abide by laws and regulations when using the service, and shall not make, copy, publish or disseminate information containing the following contents or engage in relevant activities, or provide convenience for making, reproducing, publishing or disseminating information containing the following contents:</p>
				<p>(1) Those who oppose the basic principles set forth in the constitution.</p>
				<p>(2) Endanger state security, divulge state secrets, subvert state power or undermine national unity.</p>
				<p>(3) Damaging the honour and interests of the state.</p>
				<p>(4) Incites ethnic hatred and discrimination and destroys ethnic unity.</p>
				<p>(5) Sabotaging the state's religious policies and promoting heresy and feudal superstition.</p>
				<p>(6) Spreading rumours, disturbing social order and undermining social stability.</p>
				<p>(7) Spreading obscenity, pornography, gambling, violence, murder, terror or instigation to commit crimes.</p>
				<p>(8) Insult or slander others and infringe upon the legitimate rights and interests of others.</p>
				<p>(9) Violating the requirements of the "seven bottom lines" of laws and regulations, the socialist system, national interests, citizens' legitimate rights and interests, social public order, morals and customs, and information authenticity.</p>
				<p>(10) Other behaviours prohibited by laws and regulations, this software agreement or rules.</p>
				<p>8.2.2 Software use</p>
				<p>Unless permitted by laws and regulations or permitted by the software in writing, you may not:</p>
				<p>(1) Delete the copyright information on the software and its copy.</p>
				<p>(2) Carry out reverse engineering, reverse assembly and reverse compilation of the software, or try to find the source code of the software in other ways.</p>
				<p>(3) Use, rent, lend, copy, modify, link, reprint, compile, publish, publish and build mirror sites of the contents with intellectual property rights of the software.</p>
				<p>(4) In the process of running this software or the software release to any terminal data in memory, in the process of the software to run the client and server interaction data, as well as the necessary to run this software system data, to copy, modify, add, delete, articulated run or create any derivative works, including but not limited to, the use of plug-in, plugins or by an authorized third party software tool/service access to the software and related systems.</p>
				<p>(5) Add, delete or change the functions or operational effects of the software by modifying or falsifying the instructions and data in the operation of the software, or operate or disseminate the software and methods used for the above purposes to the public, regardless of whether such actions are for commercial purposes or not.</p>
				<p>(6) Log in or use the software and/or the service, or make, publish or disseminate the above tools through third-party software, plug-ins, plug-ins and systems that are not developed or authorized by the software.</p>
				<p>(7) Interfere with the software and/or the service and its components, modules and data by itself, authorizing others or using third party software.</p>
				<p>(8) Other behaviours that may affect or interfere with the normal operation of the software and/or the service:</p>
				<p>8.2.3 Platform health and user experience</p>
				<p>The purpose of the software and/or the service is to carry out all kinds of normal communication and communication between friends and users, so you shall not engage in any activities including but not limited to the following, nor provide convenience for any of the following:</p>
				<p>(1) Conduct any abnormal communication and communication beyond the purpose set by the software and/or the service, including but not limited to sending or sharing any commercial or non-commercial information of users, companies or institutions to other users in various forms (such as inducing users to share with benefits, coercion, inciting users to share, etc.).</p>
				<p>(2) For beyond the purpose of this software and/or the service set of friends or abnormal communication, communication between the user and other purposes (including but not limited to send advertising, garbage, harassment, or the purpose of the information such as illegal), through its added or induce others to add any way to make yourself with other users to form good friends such as relationship (friend relationship including but not limited to one-way and two-way relationship between friends, the same below). You understand and agree that: if you violate the aforementioned agreement, the software has the right to un-friend you directly without your consent; If your one-way or two-way friends (hereinafter referred to as "illegal users") in violation of the agreement, this software has the right to according to this agreement, the related agreement or relevant laws and regulations, etc., to deal with illegal users, which could affect the exchange of information between you and an illegal user, the relationship between friends, and your use of this service, this is the software in order to maintain good health network environment and take necessary measures, if because of this software for illegal users take measures according to the agreement and impact on you or any loss, you will bear the losses on its own.</p>
				<p>(3) Send information through non-manual or non-manual means (such as plug-in software, programs, etc.).</p>
				<p>(4) Send various forms of advertising, promotion, garbage, harassment or illegal information.</p>
				<p>(5) Conduct account login, add friends, add groups, thumb up, leave messages, post, send photos and other abnormal operations through non-manual or non-manual means (such as plug-in software, programs, etc.).</p>
				<p>(6) Batch send information, or send abnormal information to friends, or other users through the software and/or the service.</p>
				<p>(7) Other behaviours that may affect platform health, user communication and user experience.</p>
				<p>8.2.4 Contents endangering platform security</p>
				<p>You shall not engage in or facilitate any of the following activities, including but not limited to:</p>
				<p>(1) Spread false winning information; phishing information; illegal or false financial information and other illegal; fraudulent or false information.</p>
				<p>(2) Spread the contents and information of files, programs or corresponding production tutorials containing viruses, Trojans, etc.</p>
				<p>(3) Stealing others' virtual goods or other property.</p>
				<p>(4) Other contents, information or behaviours that endanger the safety of the software, the software or other subjects.</p>
				<p>8.2.5 Data acquisition and use</p>
				<p>In order to protect the security of the data, you may not engage in or facilitate any of the following activities, including but not limited to:</p>
				<p>(1) Collect, copy, store, use or transmit data of other EchatAPP users without the express consent of other EchatAPP users or without the truthful disclosure to other EchatAPP users of the purpose and scope of use of the data, and infringe upon the legitimate rights and interests of other
					EchatAPP users.</p>
				<p>(2) Use other EchatAPP users' personal information such as EchatAPP number, nickname, mobile phone number, E-mail address and date of birth for any purpose without authorization of users and the software.</p>
				<p>(3) Attempt to reflect the search, tracking, association, mining, access to user EchatAPP number, mobile phone number, E-mail address and date of birth and other personal information.</p>
				<p>(4) Grab any user's information or any information and data related to the software and/or the service through various programs and software.</p>
				<p>(5) Without the authorization of the software, use any third-party software, plug-in, plug-in, system, etc. to view and obtain any relevant information, data and other contents of the software and/or the software, its partners or users contained in the service.</p>
				<p>(6) Other behaviours endangering data security.</p>
				<p>8.2.6 Unsealing exception.</p>
				<p>If you apply for unsealing by yourself, you should submit the unsealing application manually according to the specified procedures and rules of this software. You are not allowed to apply for unsealing through software, procedures or other behaviours, and you are not allowed to submit false materials or related information.</p>
				<p>8.3 [Legal liability]</p>
				<p>8.3.1 You understand and agree that: if you violate laws and regulations, this agreement and/or other agreements and rules of the software, the software shall have the right to take one or more of the following measures at any time according to the corresponding circumstances (the specific measures and the duration of such measures shall be determined by the software according to the circumstances of your violation or breach of contract):</p>
				<p>Warning for you.</p>
				<p>Restrict your use of the software and/or some or all functions of the service.</p>
				<p>Delete, mask or disconnect related content.</p>
				<p>Abort and terminate your use of the appropriate EchatAPP ID (the "seal").</p>
				<p>Take other reasonable and legal measures.</p>
				<p>Investigate your legal responsibility lawfully.</p>
				<p>8.3.2 If you violate the laws and regulations, this agreement and/or other agreement of this software, the rules, the software to you or your use of this software and/or the services after any actions or measures, cause you temporarily or permanently unavailable
					EchatAPP, cannot use EchatAPP login and/or the use of other products or services, you shall bear the corresponding consequences (including but not limited to, communication interrupt, the user information, E-mail and virtual property and related data, value-added services, products or services such as empty or cannot use, etc.). You should bear the loss caused by this.</p>
				<p>8.3.3 You shall take reasonable and safe backup of the data generated or stored in the service (including but not limited to friends' information, pictures, personal information, photos, etc.) outside the service. If the software adopts measures such as permanent seal on you according to this agreement, the software has the right to delete all your data related to the service or all data and information stored in the service, and you shall bear the corresponding consequences.</p>
				<p>8.3.4 If you cause any damage to any third party, you shall bear the responsibility independently; If the software suffers any loss, you should also compensate for it.</p>
				<p>8.4 [Take responsibility for your actions]</p>
				<p>You fully understand and agree that you must be responsible for all your use of the software and/or the services, including any content you publish and any consequences arising therefrom. You shall use the software and/or the service in your sole discretion, including and at your own risk of reliance on the accuracy, completeness, or usefulness of the content, and assume the corresponding risks arising therefrom. To the extent permitted by law, the software shall not be liable for any loss or damage caused by the foregoing risks.</p>
				<p>8.5 [Contents sent and disseminated by users and complaint handling]</p>
				<p>8.5.1 If the content you send or disseminate is illegal or violates the rights of others, you agree that the software has the right to make independent judgment and take measures such as deleting, shielding or disconnecting.</p>
				<p>8.5.2 If you are complained by others or you complain about others, the software has the right to provide the subject, contact information, complaint content and other necessary information of the relevant parties in the dispute to the relevant parties or departments, so as to solve the complaint dispute in a timely manner and protect the legitimate rights and interests of all parties.</p>
				<p>9. [Products or services provided by a third party]</p>
				<p>9.1 When using the products or services provided by the third party on the software platform, you shall not only abide by the provisions of this agreement, but also abide by the user agreement of the third party. The software and the third party shall bear their respective responsibilities for possible disputes within the scope of legal provisions and agreements.</p>
				<p>9.2 For users to use the software or the software is required to provide specific services, this software may be called the third party system or through a third party or support the use of user access, the result of the use or access is provided by the third party (including but not limited to you through this service to jump to third party services and content, the third party through the software open platform access services and content, etc.).</p>
				<p>10. [Advertisement]</p>
				<p>10.1 You agree that the software may send or display advertisements or other information (including commercial and non-commercial information) to you by itself or by a third party through SMS, E-mail or electronic information, and the specific sending and display form, frequency and content of advertisements or other information shall be subject to the actual provision of the software.</p>
				<p>10.2 The software will conduct advertising business in accordance with relevant laws and regulations. You agree that you shall carefully judge the authenticity and reliability of the advertisements appearing in the service and, except as expressly provided by law, you shall be responsible for the actions performed in connection with such advertisements.</p>
				<p>11. [Intellectual property statement]</p>
				<p>11.1 The software is the intellectual property right holder of the software. The software's copyright, trademarks, patents, trade secrets and other intellectual property rights, and all of the information content associated with the software (including but not limited to text, images, audio, video, graphics, interface design, layout, framework and relevant data or electronic documents, etc.) are protected by the laws and regulations and relevant international treaties, the software shall have the right of the related intellectual property rights, but the obligee's rights in accordance with the law shall be excepted.</p>
				<p>11.2 Without the written consent of the software or the relevant obligee, you may not implement, utilize or transfer the intellectual property for any commercial or non-commercial purposes or permit any third party to do so.</p>
				<p>11.3 You understand and agree that, in the use of this software and related services, through the micro view, dynamic, interest in tribal friends (function name change does not affect the validity of this agreement) content sharing function to upload, publish, share the words, pictures, video, audio etc., are or have been authorized by your original (including transfer authorization). The intellectual property rights of any content you upload, publish or share through the software belong to you or the original copyright owner.</p>
				<p>11.4 You know, understand and agree that you will be on the micro view, friends dynamic, interest in tribes, the change of the function does not affect the validity of this agreement) content sharing feature release, upload and share content (including but not limited to text, pictures, video, audio, and the content of the composition elements, etc.) of the relevant rights (including but not limited to, copy right, assembly, the right of information network transmission right, etc.), granted this software and its associated companies, control, inheritance, companies worldwide, non-exclusive, free to license (through multi-level), provide for the rights of other users to download, The scope of application includes but is not limited to the appropriate App, website, client, etc. You hereby confirm that the form of use includes but is not limited to use in specific products and services or to promote the corresponding products and services.</p>
				<p>12. [Terminal security responsibility]</p>
				<p>12.1 You understand and agree that the software and/or the service, like most Internet software and services, may be affected by various factors (including but not limited to user reasons, network service quality, social environment, etc.); It may also be invaded by various security problems (including but not limited to the illegal use of user information by others for real harassment; Other users to download and install the software or access to other sites may contain viruses, Trojans and other malicious programs, threatening the safety of your terminal information and data, which in turn affect the normal use of the software, this service, etc.), therefore, you should strengthen the protection of information security and personal information consciousness, pay attention to the password protection, so as to avoid losses.</p>
				<p>12.2 You shall not create, publish, use or disseminate malicious programs used to steal EchatAPP Numbers and/or other people's personal information or property.</p>
				<p>12.3 It is the joint responsibility of the software and you to maintain the safety and normal use of the software. The software will reasonably and prudently take necessary technical measures to protect the security of your terminal information and data in accordance with industry standards, but you acknowledge and agree that the software cannot provide any guarantee.</p>
				<p>13. [Third party software or technology]</p>
				<p>13.1 The software may use third-party software or technology (including the open source code and public domain code that the software may use, the same below), and such use has been legally authorized.</p>
				<p>13.2 The software if you use the third party software or technology, the software will be in accordance with the stipulations of the relevant laws and regulations or the relevant agreement or other documents, may through the attachment of this agreement, in the software installation package specific folder for packaging and other forms, they might be to "software license agreement" "license agreement" "open source license" or other forms to express.</p>
				<p>13.3 The foregoing relevant agreements or other documents in various forms are an integral part of this agreement and have the same legal effect as this agreement. You shall comply with these requirements. If you do not comply with these requirements, the third party or the national authority may bring a lawsuit, impose a fine or take other sanctions against you, and ask the software for assistance, and you shall bear your own legal responsibility.</p>
				<p>14. [Force majeure and other exemptions]</p>
				<p>14.1 You understand and agree that the service may be affected by force majeure and other risk factors during the use of the service. Force majeure refers to unforeseeable, insurmountable and unavoidable objective events that have a significant impact on one party or both parties, including but not limited to natural disasters such as floods, earthquakes, epidemics and storms, as well as social events such as wars, disturbances and government actions. In the event of the above situation, the software will try to cooperate with the relevant units in the first time to try to deal with it in a timely manner, but the loss caused to you by the software is exempted from liability within the scope permitted by law.</p>
				<p>14.2 To the extent permitted by law, the software shall not be liable for service interruption or obstruction caused by:</p>
				<p>(1) Be damaged by computer virus, Trojan horse or other malicious programs, hacker attacks.</p>
				<p>(2) Failure of the computer software, system, hardware and communication lines of the user or the software.</p>
				<p>(3) Improper operation of the user or use of the service by the user in a way not authorized by the software.</p>
				<p>(4) Out-dated program versions, aging equipment and/or compatibility problems.</p>
				<p>(5) Other circumstances beyond the control of the software or reasonably foreseeable.</p>
				<p>14.3 You understand and agree that during the use of the service, you may encounter risks caused by network information or other user behaviours. The software shall not be liable for the authenticity, applicability and legality of any information, nor shall it be liable for damages caused to you by infringement. These risks include, but are not limited to:</p>
				<p>(1) Anonymous or pseudonymous information containing threatening, defamatory, offensive or illegal content from others.</p>
				<p>(2) Suffer any psychological, physical and economic loss caused or possible to be caused by others' misleading, cheating or other.</p>
				<p>(3) Other risks caused by network information or user behaviour.</p>
				<p>14.4 the software has acquired the right to deal with illegal and illegal contents according to the agreement. Such right does not constitute the obligation or commitment of the software, and the software cannot guarantee the timely detection of illegal activities or corresponding treatment.</p>
				<p>14.5 Under no circumstances should you trust to borrow money, ask for passwords or other information concerning property. Involving property operations please be sure to verify the identity of the other party, and please often pay attention to the software to prevent fraud tips.</p>
				<p>15. [Other]</p>
				<p>15.1 Your use of the software and/or the services shall be deemed to have read and be bound by this agreement. The software reserves the right to modify the terms of this agreement if necessary. You can refer to the latest version of the terms of the agreement on the relevant service page. If you continue to use the software or services provided by the software after the terms of this agreement are changed, you will be deemed to have accepted the changed agreement.</p>
				<p>15.2 The establishment, entry into force, performance, interpretation and dispute resolution of this Agreement shall be subject to local laws (except conflict of laws).</p>
				<p>15.3 In case of any dispute or dispute between you and the software, it shall first be settled through friendly negotiation; If no agreement can be reached through negotiation, you agree to submit the dispute or dispute to the people's court with jurisdiction at the place where this agreement is signed (i.e. XX city, XX province).</p>
				<p>15.4 The headings of all terms hereof are for convenience only and have no actual meaning and cannot be used as the basis for interpretation of the meaning hereof.</p>
				<p>15.5 For whatever reason, part of the provisions hereof shall be invalid or unenforceable, and the remaining provisions shall remain valid and binding upon both parties.</p>
				<p>15.6 If there are multiple language versions of this agreement and the corresponding content is inconsistent, the English version shall prevail. (Finish)</p>
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
