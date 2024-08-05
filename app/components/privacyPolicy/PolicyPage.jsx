"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../lib/features/shared/sharedSlice";

const PolicyPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage("Privacy Policy"));
  }, [dispatch]);
  return (
    <div className="bg-[#f9fafb] flex-1 flex flex-col p-4 justify-start items-center">
      <div className="bg-white rounded-lg flex-1 flex flex-col w-full p-4 space-y-8">
        <div className="flex flex-col space-y-4">
          <p className="font-bold text-xl">Privacy Policies</p>
          <p className="font-semibold text-sm">Last updated 04/28/2024</p>
        </div>
        <p className="text-sm">
          This privacy notice for My Yard Manager LLC ("we," "us," or "our"),
          describes how and why we might collect, store, use, and/or share
          ("process") your information when you use our services ("Services"),
          such as when you: Questions or concerns? Reading this privacy notice
          will help you understand your privacy rights and choices. If you do
          not agree with our policies and practices, please do not use our
          Services.
        </p>
        <p className="font-bold text-sm">SUMMARY OF KEY POINTS</p>
        <div className="text-sm">
          <ul>
            We are My Yard Manager LLC, doing business as My Yard Manager
            ("Company," "we," "us," "our"), a company registered in
            Pennsylvania, United States <br /> <br /> We operate the website
            myardmanager.com (the "Site"), as well as any other related products
            and services that refer or link to these legal terms (the "Legal
            Terms") (collectively, the "Services"). <br /> <br /> My Yard
            Manager is a comprehensive software solution designed specifically
            for managing used auto parts inventory. With its user-friendly
            interface and robust features, My Yard Manager streamlines inventory
            management processes, helping auto parts businesses increase
            efficiency and drive sales. Moreover, My Yard Manager offers
            powerful search and filtering capabilities, allowing users to
            quickly locate specific parts based on various criteria such as
            make, model, year, and condition. This ensures that customers can
            easily find the parts they need, leading to higher customer
            satisfaction and repeat business. Overall, My Yard Manager is a
            comprehensive solution that helps auto parts businesses streamline
            their operations, increase efficiency, and facilitate sales. By
            centralizing inventory management, sales processing, and reporting
            tasks, it empowers businesses to focus on delivering exceptional
            service and driving business growth. <br /> <br /> You can contact
            us by email at contact@myardmanager.com <br /> <br /> These Legal
            Terms constitute a legally binding agreement made between you,
            whether personally or on behalf of an entity ("you"), and My Yard
            Manager LLC, concerning your access to and use of the Services. You
            agree that by accessing the Services, you have read, understood, and
            agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE
            WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED
            FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.{" "}
            <br /> <br /> Supplemental terms and conditions or documents that
            may be posted on the Services from time to time are hereby expressly
            incorporated herein by reference. We reserve the right, in our sole
            discretion, to make changes or modifications to these Legal Terms at
            any time and for any reason. We will alert you about any changes by
            updating the "Last updated" date of these Legal Terms, and you waive
            any right to receive specific notice of each such change. It is your
            responsibility to periodically review these Legal Terms to stay
            informed of updates. You will be subject to, and will be deemed to
            have been made aware of and to have accepted, the changes in any
            revised Legal Terms by your continued use of the Services after the
            date such revised Legal Terms are posted. <br /> <br /> The Services
            are intended for users who are at least 18 years old. Persons under
            the age of 18 are not permitted to use or register for the Services.{" "}
            <br /> <br /> We recommend that you print a copy of these Legal
            Terms for your records
          </ul>
          <h2 className="text-base font-bold pt-6">1. OUR SERVICES</h2>
          <ul className="pt-6">
            The information provided when using the Services is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement within such jurisdiction or country. Accordingly, those
            persons who choose to access the Services from other locations do so
            on their own initiative and are solely responsible for compliance
            with local laws, if and to the extent local laws are applicable.{" "}
            <br /> <br /> The Services are not tailored to comply with
            industry-specific regulations (Health Insurance Portability and
            Accountability Act (HIPAA), Federal Information Security Management
            Act (FISMA), etc.), so if your interactions would be subjected to
            such laws, you may not use the Services. You may not use the
            Services in a way that would violate the Gramm-Leach-Bliley Act
            (GLBA).{" "}
          </ul>
          <h2 className="text-base font-bold pt-6">
            2. INTELLECTUAL PROPERTY RIGHTS?
          </h2>
          <ul className="pt-6">
            Our intellectual property <br /> <br /> We are the owner or the
            licensee of all intellectual property rights in our Services,
            including all source code, databases, functionality, software,
            website designs, audio, video, text, photographs, and graphics in
            the Services (collectively, the "Content"), as well as the
            trademarks, service marks, and logos contained therein (the
            "Marks"). <br /> <br /> Our Content and Marks are protected by
            copyright and trademark laws (and various other intellectual
            property rights and unfair competition laws) and treaties in the
            United States and around the world. <br /> <br /> The Content and
            Marks are provided in or through the Services "AS IS" for your
            internal business purpose only. <br /> <br /> Your use of our
            Services <br /> <br /> Subject to your compliance with these Legal
            Terms, including the "PROHIBITED ACTIVITIES" section below, we grant
            you a non-exclusive, non-transferable, revocable license to: <br />
            <li>access the Services, and</li>
            <li>
              download or print a copy of any portion of the Content to which
              you have properly gained access.
            </li>
            solely for your internal business purposes. <br /> <br /> Except as
            set out in this section or elsewhere in our Legal Terms, no part of
            the Services and no Content or Marks may be copied, reproduced,
            aggregated, republished, uploaded, posted, publicly displayed,
            encoded, translated, transmitted, distributed, sold, licensed, or
            otherwise exploited for any commercial purpose whatsoever, without
            our express prior written permission. <br /> <br /> If you wish to
            make any use of the Services, Content, or Marks other than as set
            out in this section or elsewhere in our Legal Terms, please address
            your request to: contact@myardmanager.com. If we ever grant you the
            permission to post, reproduce, or publicly display any part of our
            Services or Content, you must identify us as the owners or licensors
            of the Services, Content, or Marks and ensure that any copyright or
            proprietary notice appears or is visible on posting, reproducing, or
            displaying our Content. <br /> <br /> We reserve all rights not
            expressly granted to you in and to the Services, Content, and Marks.{" "}
            <br /> <br /> Any breach of these Intellectual Property Rights will
            constitute a material breach of our Legal Terms and your right to
            use our Services will terminate immediately. <br /> <br /> Your
            submissions <br /> <br /> Please review this section and the
            "PROHIBITED ACTIVITIES" section carefully prior to using our
            Services to understand the (a) rights you give us and (b)
            obligations you have when you post or upload any content through the
            Services. <br /> <br /> Submissions: By directly sending us any
            question, comment, suggestion, idea, feedback, or other information
            about the Services ("Submissions"), you agree to assign to us all
            intellectual property rights in such Submission. You agree that we
            shall own this Submission and be entitled to its unrestricted use
            and dissemination for any lawful purpose, commercial or otherwise,
            without acknowledgment or compensation to you. <br /> <br /> You are
            responsible for what you post or upload: By sending us Submissions
            through any part of the Services you: <br />
            <li>
              confirm that you have read and agree with our "PROHIBITED
              ACTIVITIES" and will not post, send, publish, upload, or transmit
              through the Services any Submission that is illegal, harassing,
              hateful, harmful, defamatory, obscene, bullying, abusive,
              discriminatory, threatening to any person or group, sexually
              explicit, false, inaccurate, deceitful, or misleading;
            </li>
            <li>
              to the extent permissible by applicable law, waive any and all
              moral rights to any such Submission;
            </li>
            <li>
              warrant that any such Submission are original to you or that you
              have the necessary rights and licenses to submit such Submissions
              and that you have full authority to grant us the above-mentioned
              rights in relation to your Submissions; and
            </li>
            <li>
              warrant and represent that your Submissions do not constitute
              confidential information.
            </li>
            You are solely responsible for your Submissions and you expressly
            agree to reimburse us for any and all losses that we may suffer
            because of your breach of (a) this section, (b) any third party's
            intellectual property rights, or (c) applicable law.
          </ul>
          <h2 className="text-base font-bold pt-6">3. USER REPRESENTATION</h2>
          <ul className="pt-6">
            By using the Services, you represent and warrant that: (1) all
            registration information you submit will be true, accurate, current,
            and complete; (2) you will maintain the accuracy of such information
            and promptly update such registration information as necessary; (3)
            you have the legal capacity and you agree to comply with these Legal
            Terms; (4) you are not a minor in the jurisdiction in which you
            reside; (5) you will not access the Services through automated or
            non-human means, whether through a bot, script or otherwise; (6) you
            will not use the Services for any illegal or unauthorized purpose;
            and (7) your use of the Services will not violate any applicable law
            or regulation. <br /> <br /> If you provide any information that is
            untrue, inaccurate, not current, or incomplete, we have the right to
            suspend or terminate your account and refuse any and all current or
            future use of the Services (or any portion thereof).
          </ul>
          <h2 className="text-base font-bold pt-6">4. USER REGISTRATION</h2>
          <ul className="pt-6">
            You may be required to register to use the Services. You agree to
            keep your password confidential and will be responsible for all use
            of your account and password. We reserve the right to remove,
            reclaim, or change a username you select if we determine, in our
            sole discretion, that such username is inappropriate, obscene, or
            otherwise objectionable
          </ul>
          <h2 className="text-base font-bold pt-6">5. PURCHASES AND PAYMENT</h2>
          <ul className="pt-6">
            We accept the following forms of payment: <br /> <br /> - Visa{" "}
            <br /> - Mastercard <br /> - American Express <br /> - Discover{" "}
            <br /> - PayPal <br /> <br /> You agree to provide current,
            complete, and accurate purchase and account information for all
            purchases made via the Services. You further agree to promptly
            update account and payment information, including email address,
            payment method, and payment card expiration date, so that we can
            complete your transactions and contact you as needed. Sales tax will
            be added to the price of purchases as deemed required by us. We may
            change prices at any time. All payments shall be in US dollars.{" "}
            <br /> <br /> You agree to pay all charges at the prices then in
            effect for your purchases and any applicable fees, and you authorize
            us to charge your chosen payment provider for any such amounts upon
            placing your order. We reserve the right to correct any errors or
            mistakes in pricing, even if we have already requested or received
            payment. <br /> <br /> We reserve the right to refuse any order
            placed through the Services. We may, in our sole discretion, limit
            or cancel quantities purchased per person, per household, or per
            order. These restrictions may include orders placed by or under the
            same customer account, the same payment method, and/or orders that
            use the same billing or shipping address. We reserve the right to
            limit or prohibit orders that, in our sole judgment, appear to be
            placed by dealers, resellers, or distributors. <br /> . <br />
          </ul>
          <h2 className="text-base font-bold pt-6">6. SUBSCRIPTIONS</h2>
          <ul className="pt-6">
            Billing and Renewal <br /> <br /> Your subscription will continue
            and automatically renew unless canceled. You consent to our charging
            your payment method on a recurring basis without requiring your
            prior approval for each recurring charge, until such time as you
            cancel the applicable order. The length of your billing cycle will
            depend on the type of subscription plan you choose when you
            subscribed to the Services. <br /> <br /> Free Trial <br /> <br />{" "}
            We offer a 21-day free trial to new users who register with the
            Services. The account will be charged according to the user's chosen
            subscription at the end of the free trial. However, we retain the
            right to refuse to offer the trial period at our discretion. <br />{" "}
            <br /> Cancellation <br /> <br /> All purchases are non-refundable.
            You can cancel your subscription at any time by contacting us using
            the contact information provided below. Your cancellation will take
            effect at the end of the current paid term. If you have any
            questions or are unsatisfied with our Services, please email us at
            contact@myardmanager.com. <br /> <br /> Fee Changes <br /> <br /> We
            may, from time to time, make changes to the subscription fee and
            will communicate any price changes to you in accordance with
            applicable law. <br /> <br />
          </ul>
          <h2 className="text-base font-bold pt-6">7. PROHIBITED ACTIVITIES</h2>
          <ul className="pt-6">
            You may not access or use the Services for any purpose other than
            that for which we make the Services available. The Services may not
            be used in connection with any commercial endeavors except those
            that are specifically endorsed or approved by us. <br />
            <br />
            As a user of the Services, you agree not to:
            <li>
              Systematically retrieve data or other content from the Services to
              create or compile, directly or indirectly, a collection,
              compilation, database, or directory without written permission
              from us.
            </li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any
              attempt to learn sensitive account information such as user
              passwords.
            </li>
            <li>
              Circumvent, disable, or otherwise interfere with security-related
              features of the Services, including features that prevent or
              restrict the use or copying of any Content or enforce limitations
              on the use of the Services and/or the Content contained therein.
            </li>
            <li>
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or
              the Services.
            </li>
            <li>
              Use any information obtained from the Services in order to harass,
              abuse, or harm another person.
            </li>
            <li>
              Make improper use of our support services or submit false reports
              of abuse or misconduct.
            </li>
            <li>
              Use the Services in a manner inconsistent with any applicable laws
              or regulations.
            </li>
            <li>
              Engage in unauthorized framing of or linking to the Services.
            </li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) viruses,
              Trojan horses, or other material, including excessive use of
              capital letters and spamming (continuous posting of repetitive
              text), that interferes with any party’s uninterrupted use and
              enjoyment of the Services or modifies, impairs, disrupts, alters,
              or interferes with the use, features, functions, operation, or
              maintenance of the Services.
            </li>
            <li>
              Engage in any automated use of the system, such as using scripts
              to send comments or messages, or using any data mining, robots, or
              similar data gathering and extraction tools.
            </li>
            <li>
              Delete the copyright or other proprietary rights notice from any
              Content.
            </li>
            <li>
              Attempt to impersonate another user or person or use the username
              of another user.
            </li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) any
              material that acts as a passive or active information collection
              or transmission mechanism, including without limitation, clear
              graphics interchange formats ("gifs"), 1x1 pixels, web bugs,
              cookies, or other similar devices (sometimes referred to as
              "spyware" or"passive collection mechanisms" or "pcms").
            </li>
            <li>
              Interfere with, disrupt, or create an undue burden on the Services
              or the networks or services connected to the Services.
            </li>
            <li>
              Harass, annoy, intimidate, or threaten any of our employees or
              agents engaged in providing any portion of the Services to you.
            </li>
            <li>
              Attempt to bypass any measures of the Services designed to prevent
              or restrict access to the Services, or any portion of the
              Services.
            </li>
            <li>
              Copy or adapt the Service's software, including but not limited to
              Flash, PHP, HTML, JavaScript, or other code.
            </li>
            <li>
              Except as permitted by applicable law, decipher, decompile,
              disassemble, or reverse engineer any of the software comprising or
              in any way making up a part of the Services.
            </li>
            <li>
              Except as may be the result of standard search engine or Internet
              browser usage, use, launch, develop, or distribute any automated
              system, including without limitation, any spider, robot, cheat
              utility, scraper, or offline reader that accesses the Services, or
              use or launch any unauthorized script or other software.
            </li>
            <li>
              Use a buying agent or purchasing agent to make purchases on the
              Services.
            </li>
            <li>
              Make any unauthorized use of the Services, including collecting
              usernames and/or email addresses of users by electronic or other
              means for the purpose of sending unsolicited email, or creating
              user accounts by automated means or under false pretenses.
            </li>
            <li>
              Use the Services as part of any effort to compete with us or
              otherwise use the Services and/or the Content for any
              revenue-generating endeavor or commercial enterprise.
            </li>
            <li>Sell or otherwise transfer your profile.</li>
          </ul>
          <h2 className="text-base font-bold pt-6">8. CONTRIBUTION LICENSE</h2>
          <ul className="pt-6">
            You and Services agree that we may access, store, process, and use
            any information and personal data that you provide and your choices
            (including settings). <br /> <br /> By submitting suggestions or
            other feedback regarding the Services, you agree that we can use and
            share such feedback for any purpose without compensation to you.
          </ul>
          <h2 className="text-base font-bold pt-6">
            9. THIRD-PARTY WEBSITES AND CONTENT
          </h2>
          <ul className="pt-6">
            The Services may contain (or you may be sent via the Site) links to
            other websites ("Third-Party Websites") as well as articles,
            photographs, text, graphics, pictures, designs, music, sound, video,
            information, applications, software, and other content or items
            belonging to or originating from third parties ("Third-Party
            Content"). Such Third-Party Websites and Third-Party Content are not
            investigated, monitored, or checked for accuracy, appropriateness,
            or completeness by us, and we are not responsible for any
            Third-Party Websites accessed through the Services or any
            Third-Party Content posted on, available through, or installed from
            the Services, including the content, accuracy, offensiveness,
            opinions, reliability, privacy practices, or other policies of or
            contained in the Third-Party Websites or the Third-Party Content.
            Inclusion of, linking to, or permitting the use or installation of
            any Third-Party Websites or any Third-Party Content does not imply
            approval or endorsement thereof by us. If you decide to leave the
            Services and access the Third-Party Websites or to use or install
            any Third-Party Content, you do so at your own risk, and you should
            be aware these Legal Terms no longer govern. You should review the
            applicable terms and policies, including privacy and data gathering
            practices, of any website to which you navigate from the Services or
            relating to any applications you use or install from the Services.
            Any purchases you make through Third-Party Websites will be through
            other websites and from other companies, and we take no
            responsibility whatsoever in relation to such purchases which are
            exclusively between you and the applicable third party. You agree
            and acknowledge that we do not endorse the products or services
            offered on Third-Party Websites and you shall hold us blameless from
            any harm caused by your purchase of such products or services.
            Additionally, you shall hold us blameless from any losses sustained
            by you or harm caused to you relating to or resulting in any way
            from any Third-Party Content or any contact with Third-Party
            Websites.
          </ul>
          <h2 className="text-base font-bold pt-6">10. SERVICES MANAGEMENT</h2>
          <ul className="pt-6">
            We reserve the right, but not the obligation, to: (1) monitor the
            Services for violations of these Legal Terms; (2) take appropriate
            legal action against anyone who, in our sole discretion, violates
            the law or these Legal Terms, including without limitation,
            reporting such user to law enforcement authorities; (3) in our sole
            discretion and without limitation, refuse, restrict access to, limit
            the availability of, or disable (to the extent technologically
            feasible) any of your Contributions or any portion thereof; (4) in
            our sole discretion and without limitation, notice, or liability, to
            remove from the Services or otherwise disable all files and content
            that are excessive in size or are in any way burdensome to our
            systems; and (5) otherwise manage the Services in a manner designed
            to protect our rights and property and to facilitate the proper
            functioning of the Services.
          </ul>
          <h2 className="text-base font-bold pt-6">11. PRIVACY POLICY</h2>
          <ul className="pt-6">
            We care about data privacy and security. By using the Services, you
            agree to be bound by our Privacy Policy posted on the Services,
            which is incorporated into these Legal Terms. Please be advised the
            Services are hosted in the United States. If you access the Services
            from any other region of the world with laws or other requirements
            governing personal data collection, use, or disclosure that differ
            from applicable laws in the United States, then through your
            continued use of the Services, you are transferring your data to the
            United States, and you expressly consent to have your data
            transferred to and processed in the United States..
          </ul>
          <h2 className="text-base font-bold pt-6">12. TERM AND TERMINATION</h2>
          <ul className="pt-6">
            These Legal Terms shall remain in full force and effect while you
            use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE
            LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND
            WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES
            (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY
            REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF
            ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL
            TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR
            USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY
            CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING,
            IN OUR SOLE DISCRETION. <br /> <br /> If we terminate or suspend
            your account for any reason, you are prohibited from registering and
            creating a new account under your name, a fake or borrowed name, or
            the name of any third party, even if you may be acting on behalf of
            the third party. In addition to terminating or suspending your
            account, we reserve the right to take appropriate legal action,
            including without limitation pursuing civil, criminal, and
            injunctive redress.
          </ul>
          <h2 className="text-base font-bold pt-6">
            13. MODIFICATIONS AND INTERRUPTIONS
          </h2>
          <ul className="pt-6">
            We reserve the right to change, modify, or remove the contents of
            the Services at any time or for any reason at our sole discretion
            without notice. However, we have no obligation to update any
            information on our Services. We will not be liable to you or any
            third party for any modification, price change, suspension, or
            discontinuance of the Services. <br /> <br /> We cannot guarantee
            the Services will be available at all times. We may experience
            hardware, software, or other problems or need to perform maintenance
            related to the Services, resulting in interruptions, delays, or
            errors. We reserve the right to change, revise, update, suspend,
            discontinue, or otherwise modify the Services at any time or for any
            reason without notice to you. You agree that we have no liability
            whatsoever for any loss, damage, or inconvenience caused by your
            inability to access or use the Services during any downtime or
            discontinuance of the Services. Nothing in these Legal Terms will be
            construed to obligate us to maintain and support the Services or to
            supply any corrections, updates, or releases in connection
            therewith.
          </ul>
          <h2 className="text-base font-bold pt-6">14. Governing Law</h2>
          <ul className="pt-6">
            Exclusive Jurisdiction in Pennsylvania, U.S.A. This myardmanager.com
            Website User Agreement (and your use of our myardmanager.com Website
            and/or any myardmanager.com Website Service) shall be construed in
            accordance with and governed by the law of the Commonwealth of
            Pennsylvania, United States of America (without regard to principles
            of conflict of laws), including the application of any applicable
            statutes of limitations. You understand, acknowledge and agree that
            any action, suit or proceeding brought by you or us with respect to
            this myardmanager.com Website User Agreement (and/or your use of our
            myardmanager.com Website, your use of any myardmanager.com Website
            Service, and/or your use of any information obtained from the
            myardmanager.com Website or the use of any myardmanager.com Website
            Service (including, without limitation, the data derived from
            searches on our myardmanager.com Website)) shall be brought
            exclusively in the courts of the Commonwealth of Pennsylvania
            located in Philadelphia, Pennsylvania, United States of America. By
            your use of our myardmanager.com Website and/or any myardmanager.com
            Website Service, you irrevocably submit to the exclusive
            jurisdiction and venue of the courts of the Commonwealth of
            Pennsylvania located in Philadelphia, Pennsylvania, United States of
            America.
          </ul>
          <h2 className="text-base font-bold pt-6">15. DISPUTE RESOLUTION</h2>
          <ul className="pt-6">
            Any legal action of whatever nature brought by either you or us
            (collectively, the"Parties" and individually, a "Party") shall be
            commenced or prosecuted in the state and federal courts located in
            Philadelphia, Pennsylvania, and the Parties hereby consent to and
            waive all defenses of lack of personal jurisdiction and forum non
            conveniens with respect to venue and jurisdiction in such state and
            federal courts. Application of the United Nations Convention on
            Contracts for the International Sale of Goods and the Uniform
            Computer Information Transaction Act (UCITA) are excluded from these
            Legal Terms. In no event shall any claim, action, or proceeding
            brought by either Party related in any way to the Services be
            commenced more than one (1) year after the cause of action arose.
          </ul>
          <h2 className="text-base font-bold pt-6">16. CORRECTIONS</h2>
          <ul className="pt-6">
            There may be information on the Services that contains typographical
            errors, inaccuracies, or omissions, including descriptions, pricing,
            availability, and various other information. We reserve the right to
            correct any errors, inaccuracies, or omissions and to change or
            update the information on the Services at any time, without prior
            notice.
          </ul>
          <h2 className="text-base font-bold pt-6">17. DISCLAIMER</h2>
          <ul className="pt-6">
            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
            AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO
            THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
            EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE
            THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
            ACCURACY OR COMPLETENESS OF THE SERVICES'CONTENT OR THE CONTENT OF
            ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE
            WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS,
            MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL
            INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM
            YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS
            TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL
            INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY
            INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES,
            (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
            TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR
            (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY
            LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY
            CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE
            SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
            RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A
            THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY
            WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
            ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
            RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
            THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE
            OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT,
            YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE
            APPROPRIATE.
          </ul>
          <h2 className="text-base font-bold pt-6">18. DISCLAIMER</h2>
          <ul className="pt-6">
            You agree to indemnify and hold us and our suppliers, subsidiaries,
            affiliates, officers, directors, agents and employees harmless from
            any claims, demands, liabilities, damages, costs and/or expenses
            (including, without limitation, attorneys' fees and any costs to
            defend) that we incur as a result of: (a) your breach of this
            myardmanager.com Website User Agreement; (b) your use of our
            myardmanager.com Website or any of the information or content
            contained on the myardmanager.com Website (including, without
            limitation, the data derived from searches on our site); and/or (c)
            your use of any myardmanager.com Website Service.
          </ul>
          <h2 className="text-base font-bold pt-6">19. INDEMNIFICATION</h2>
          <ul className="pt-6">
            Any legal action of whatever nature brought by either you or us
            (collectively, the"Parties" and individually, a "Party") shall be
            commenced or prosecuted in the state and federal courts located in
            Philadelphia, Pennsylvania, and the Parties hereby consent to and
            waive all defenses of lack of personal jurisdiction and forum non
            conveniens with respect to venue and jurisdiction in such state and
            federal courts. Application of the United Nations Convention on
            Contracts for the International Sale of Goods and the Uniform
            Computer Information Transaction Act (UCITA) are excluded from these
            Legal Terms. In no event shall any claim, action, or proceeding
            brought by either Party related in any way to the Services be
            commenced more than one (1) year after the cause of action arose.
          </ul>
          <h2 className="text-base font-bold pt-6">20. USER DATA</h2>
          <ul className="pt-6">
            We will maintain certain data that you transmit to the Services for
            the purpose of managing the performance of the Services, as well as
            data relating to your use of the Services. Although we perform
            regular routine backups of data, you are solely responsible for all
            data that you transmit or that relates to any activity you have
            undertaken using the Services. You agree that we shall have no
            liability to you for any loss or corruption of any such data, and
            you hereby waive any right of action against us arising from any
            such loss or corruption of such data.
          </ul>
          <h2 className="text-base font-bold pt-6">
            21. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
          </h2>
          <ul className="pt-6">
            Visiting the Services, sending us emails, and completing online
            forms constitute electronic communications. You consent to receive
            electronic communications, and you agree that all agreements,
            notices, disclosures, and other communications we provide to you
            electronically, via email, and on the Services, satisfy any legal
            requirement that such communication be in writing. YOU HEREBY AGREE
            TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER
            RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND
            RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE
            SERVICES. You hereby waive any rights or requirements under any
            statutes, regulations, rules, ordinances, or other laws in any
            jurisdiction which require an original signature or delivery or
            retention of non-electronic records, or to payments or the granting
            of credits by any means other than electronic means.
          </ul>
          <h2 className="text-base font-bold pt-6">22. SMS TEXT MESSAGING</h2>
          <ul className="pt-6">
            Opting Out <br /> <br /> If at any time you wish to stop receiving
            SMS messages from us, simply reply to the text with "STOP.” You may
            receive an SMS message confirming your opt-out. <br /> <br />{" "}
            Message and Data Rates <br /> <br /> Please be aware that message
            and data rates may apply to any SMS messages sent or received. The
            rates are determined by your carrier and the specifics of your
            mobile plan. <br /> <br /> Support <br /> <br /> If you have any
            questions or need assistance regarding our SMS communications,
            please email us at contact@myardmanager.com.
          </ul>
          <h2 className="text-base font-bold pt-6">
            23. CALIFORNIA USERS AND RESIDENTS
          </h2>
          <ul className="pt-6">
            If any complaint with us is not satisfactorily resolved, you can
            contact the Complaint Assistance Unit of the Division of Consumer
            Services of the California Department of Consumer Affairs in writing
            at 1625 North Market Blvd., Suite N 112, Sacramento, California
            95834 or by telephone at (800) 952-5210 or (916) 445-1254..
          </ul>
          <h2 className="text-base font-bold pt-6">24. MISCELLANEOUS</h2>
          <ul className="pt-6">
            These Legal Terms and any policies or operating rules posted by us
            on the Services or in respect to the Services constitute the entire
            agreement and understanding between you and us. Our failure to
            exercise or enforce any right or provision of these Legal Terms
            shall not operate as a waiver of such right or provision. These
            Legal Terms operate to the fullest extent permissible by law. We may
            assign any or all of our rights and obligations to others at any
            time. We shall not be responsible or liable for any loss, damage,
            delay, or failure to act caused by any cause beyond our reasonable
            control. If any provision or part of a provision of these Legal
            Terms is determined to be unlawful, void, or unenforceable, that
            provision or part of the provision is deemed severable from these
            Legal Terms and does not affect the validity and enforceability of
            any remaining provisions. There is no joint venture, partnership,
            employment or agency relationship created between you and us as a
            result of these Legal Terms or use of the Services. You agree that
            these Legal Terms will not be construed against us by virtue of
            having drafted them. You hereby waive any and all defenses you may
            have based on the electronic form of these Legal Terms and the lack
            of signing by the parties hereto to execute these Legal Terms.
          </ul>
          <h2 className="text-base font-bold pt-6">
            25. Our Right to Terminate Access to Our myardmanager.com Website
            and myardmanager.com Website Services
          </h2>
          <ul className="pt-6">
            We reserve the right to choose not to deal with any person for any
            reason (or for no reason whatsoever). Without limiting that right,
            we may immediately suspend (either for a set period of time or
            indefinitely) or terminate your right to access or use our
            myardmanager.com Website and/or any myardmanager.com Website
            Service: (a) if you breach any provision of this myardmanager.com
            Website User Agreement, (b) if you fail to pay the fees applicable
            to your use of the myardmanager.com Website and myardmanager.com
            Website Services in a timely manner, (c) if we are unable to verify
            or authenticate any information that you provide to us, (d) if we
            believe that your actions may result in legal liability for you, for
            any of our other customers (including, without limitation, other
            users of our myardmanager.com Website or parts sellers displaying
            their inventory on our myardmanager.com Website), or for
            myardmanager.com, or (e) for any other reason.
          </ul>
          <h2 className="text-base font-bold pt-6">26. Notices</h2>
          <ul className="pt-6">
            Any notices to myardmanager.com must be given by postal mail sent to
            myardmanager.com's headquarters as it is then posted on our
            www.myardmanager.com site. Any notices to you will be sent to the
            e-mail address that you provide to myardmanager.com.
          </ul>
          <h2 className="text-base font-bold pt-6">27. Entire Agreement</h2>
          <ul className="pt-6">
            This myardmanager.com Website User Agreement constitutes the entire
            agreement between you and myardmanager.com with respect to your use
            of our myardmanager.com Website and/or any myardmanager.com Website
            Service. This myardmanager.com Website User Agreement supersedes any
            other agreements, advertisements, writings, descriptions or
            communications of any nature whatsoever regarding the terms upon
            which you may use our myardmanager.com Website and/or any
            myardmanager.com Website Service (including, without limitation, any
            telephone or email communications that you may have had with any
            employee or agent of myardmanager.com and anything contrary to the
            terms set forth in this myardmanager.com Website User Agreement set
            forth elsewhere on our myardmanager.com Website).
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
