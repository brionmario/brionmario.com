/**
 * MIT License
 *
 * Copyright (c) 2022 Brion Mario
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/** @jsxImportSource @emotion/react */
import { TestableComponent } from "@brionmario/ui";
import { ClassNames } from "@emotion/react";
import { Button, Grid, Input, Note } from "@geist-ui/core";
import AtSign from "@geist-ui/icons/atSign";
import User from "@geist-ui/icons/user";
import { AnimatePresence, motion } from "framer-motion";
import isEmpty from "lodash-es/isEmpty";
import { ChangeEvent, FC, Fragment, HTMLAttributes, ReactElement, useState } from "react";
import MailchimpSubscribe, { EmailFormFields, NameFormFields } from "react-mailchimp-subscribe";
import SiteConfig from "../site.config";

interface Props extends TestableComponent { }

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;

export type NewsletterSubscribeProps = Props & NativeAttrs;

/**
* Newsletter Subscribe component using Mail Chimp.
*
* @param props - Newsletter Subscribe component properties.
* @returns A ReactElement.
*/
export const NewsletterSubscribe: FC<NewsletterSubscribeProps> = (
  props: NewsletterSubscribeProps
): ReactElement => {

  const {
    className,
    "data-testid": testId
  } = props;

  const _css: string = getCSS();

  const [ email, setEmail ] = useState<string>(null);
  const [ firstName, setFirstName ] = useState<string>(null);

  /**
   * Moderates the raw feedback messages from Mail Chimp.
   * @param message - The message from Mail Chimp.
   * @returns Human friendly message.
   */
  const moderateMessages = (message: string | Error): string => {

    if (typeof message !== "string") {
      return "Oops! Something went wrong. Please try again.";
    }

    if (message.startsWith("Thank you for subscribing!")
      || message.startsWith("Almost finished... We need to confirm your email address.")) {
      return "Thanks for subscribing! Check your email for the confirmation link.";
    }

    if (typeof message === "string" &&  message.startsWith("0 - An email address must contain a single @")) {
      return "Please enter a valid email address.";
    }

    return message;
  };

  return (
    <ClassNames>
      { ({ css, cx }) => (
        <div
          className={ cx("newsletter_subscription", className) }
          css={ css(_css) }
        >
          <MailchimpSubscribe
            data-testid={ testId }
            url={ SiteConfig.forms.newsletter.mailchimp.subscriptionURL }
            render={ ({ subscribe, status, message }) => (
              <Fragment>
                <Grid.Container className="newsletter_subscription__form__container" justify="center">
                  <Grid>
                    <AnimatePresence>
                      { message && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Note label={ false } filled mb={ 1 } type={ status as "success" | "error" }>
                            { moderateMessages(message) }
                          </Note>
                        </motion.div>
                      ) }
                    </AnimatePresence>
                    <Input
                      width="100%"
                      type={ status === "error" ? "error" : undefined }
                      icon={ <User /> }
                      placeholder="Enter your first name"
                      data-testid="newsletter-subscribe-first-name-input"
                      className="newsletter_subscription__form__field"
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => {
                        setFirstName(e.target.value);
                      } }
                    />
                    <Input
                      mt={ 0.5 }
                      width="100%"
                      type={ status === "error" ? "error" : undefined }
                      icon={ <AtSign /> }
                      placeholder="Enter your email"
                      data-testid="newsletter-subscribe-email-input"
                      className="newsletter_subscription__form__field"
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                      } }
                    />
                    <Button
                      mt={ 0.5 }
                      width="100%"
                      loading={ status === "sending" }
                      disabled={ isEmpty(email) }
                      scale={ 4/3 }
                      data-testid="newsletter-subscribe-button"
                      className="newsletter_subscription__form__field"
                      onClick={ () => {

                        if (isEmpty(email) || isEmpty(firstName)) {
                          return;
                        }

                        if (email.indexOf("@") < -1) {
                          return;
                        }

                        subscribe({
                          EMAIL: email,
                          FNAME: firstName
                        } as EmailFormFields & Partial<NameFormFields>);
                      } }
                    >
                      Sign me up!
                    </Button>
                  </Grid>
                </Grid.Container>
              </Fragment>
            ) }
          />
        </div>
      ) }
    </ClassNames>
  );
};

const getCSS = (): string => `
  .newsletter_subscription__form__container {
    max-width: 544px;
  }
  .newsletter_subscription__form__field {
    height: 50px !important;
  }
`;

const defaultProps: Partial<NewsletterSubscribeProps> = {};

NewsletterSubscribe.defaultProps = defaultProps;
