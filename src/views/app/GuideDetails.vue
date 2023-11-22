<template>
    <div class="br-16 bg-white main-details-wrapper flx column gap-16">
        <div class="flx jc-sb ai-c">
            <h4>Guide Details</h4>
            <button v-if="guide.is_approved" @click="$store.commit('setDeleteModal', {id: guide.id, type: 'guide'})" class="button-danger btn-rounded btn-sm">Delete Guide</button>
            <button v-else @click="$store.commit('preSetTempData', {data: guide, modal: 'new_guide'})" class="button-primary btn-rounded btn-sm">Approve guide</button>
        </div>
        <img class="br-16 profile-img" :src="guide.profile_picture ? s3bucket+'/'+guide.profile_picture : default_avatar" :alt="guide.name">
        <div class="flx jc-sb ai-c">
            <h3>{{ guide.name }}</h3>
            <div>
                <a href="#" class="a-link">See all events</a>
            </div>
        </div>
        <div class="flx column gap-4">
            <div class="gray">Status</div>
            <div class="flx">
                <div class="flx guide-status gap-4 ai-c br-8" :class="guide.is_approved ? 'verified' : 'unverified'">
                    <span class="fs-09">{{ guide.is_approved ? 'Verified' : 'Unverified'}}</span>
                    <i>
                        <svg v-if="guide.is_approved" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 12 10" fill="none">
                            <path d="M4.5853 8.02089L10.3203 2.28589L9.54932 1.52843L4.57177 6.49246L2.28589 4.19304L1.51491 4.96402L4.5853 8.02089ZM4.5853 9.54932L0 4.96402L2.28589 2.66461L4.5853 4.96402L9.5358 0L11.8623 2.27236L4.5853 9.54932Z" fill="#5AF9C0"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 16.195 16.195">
                            <path d="M10.668,3.4l6.786,13.525H3.882L10.668,3.4Zm0-1.467a1.171,1.171,0,0,0-.963.706L2.793,16.411c-.53.942-.079,1.712,1,1.712H17.542c1.08,0,1.531-.77,1-1.712h0L11.631,2.634A1.17,1.17,0,0,0,10.668,1.928ZM11.68,15.086a1.012,1.012,0,1,1-1.012-1.012A1.012,1.012,0,0,1,11.68,15.086Zm-1.012-2.024A1.012,1.012,0,0,1,9.656,12.05V9.013a1.012,1.012,0,1,1,2.024,0V12.05A1.012,1.012,0,0,1,10.668,13.062Z" transform="translate(-2.571 -1.928)" fill="#ff3b3b"/>
                        </svg>
                    </i>
                </div>
            </div>
        </div>
        <div class="flx jc-sb ai-c">
            <!-- <div>
                <div class="gray">Customer ratings</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 105 17" fill="none">
                        <path d="M7.54894 2.92705C7.8483 2.00574 9.1517 2.00574 9.45106 2.92705L10.1839 5.18237C10.3177 5.5944 10.7017 5.87336 11.1349 5.87336L13.5063 5.87336C14.475 5.87336 14.8778 7.11297 14.0941 7.68237L12.1756 9.07624C11.8251 9.33088 11.6784 9.78225 11.8123 10.1943L12.5451 12.4496C12.8445 13.3709 11.79 14.137 11.0063 13.5676L9.08778 12.1738C8.7373 11.9191 8.2627 11.9191 7.91221 12.1738L5.99372 13.5676C5.21001 14.137 4.15553 13.3709 4.45488 12.4496L5.18768 10.1943C5.32155 9.78225 5.1749 9.33088 4.82441 9.07624L2.90592 7.68237C2.1222 7.11297 2.52498 5.87336 3.4937 5.87336L5.86509 5.87336C6.29832 5.87336 6.68227 5.5944 6.81614 5.18237L7.54894 2.92705Z" fill="#F2C37B"/>
                        <path d="M29.5489 2.92705C29.8483 2.00574 31.1517 2.00574 31.4511 2.92705L32.1839 5.18237C32.3177 5.5944 32.7017 5.87336 33.1349 5.87336L35.5063 5.87336C36.475 5.87336 36.8778 7.11297 36.0941 7.68237L34.1756 9.07624C33.8251 9.33088 33.6784 9.78225 33.8123 10.1943L34.5451 12.4496C34.8445 13.3709 33.79 14.137 33.0063 13.5676L31.0878 12.1738C30.7373 11.9191 30.2627 11.9191 29.9122 12.1738L27.9937 13.5676C27.21 14.137 26.1555 13.3709 26.4549 12.4496L27.1877 10.1943C27.3216 9.78225 27.1749 9.33088 26.8244 9.07624L24.9059 7.68237C24.1222 7.11297 24.525 5.87336 25.4937 5.87336L27.8651 5.87336C28.2983 5.87336 28.6823 5.5944 28.8161 5.18237L29.5489 2.92705Z" fill="#F2C37B"/>
                        <path d="M51.5489 2.92705C51.8483 2.00574 53.1517 2.00574 53.4511 2.92705L54.1839 5.18237C54.3177 5.5944 54.7017 5.87336 55.1349 5.87336L57.5063 5.87336C58.475 5.87336 58.8778 7.11297 58.0941 7.68237L56.1756 9.07624C55.8251 9.33088 55.6784 9.78225 55.8123 10.1943L56.5451 12.4496C56.8445 13.3709 55.79 14.137 55.0063 13.5676L53.0878 12.1738C52.7373 11.9191 52.2627 11.9191 51.9122 12.1738L49.9937 13.5676C49.21 14.137 48.1555 13.3709 48.4549 12.4496L49.1877 10.1943C49.3216 9.78225 49.1749 9.33088 48.8244 9.07624L46.9059 7.68237C46.1222 7.11297 46.525 5.87336 47.4937 5.87336L49.8651 5.87336C50.2983 5.87336 50.6823 5.5944 50.8161 5.18237L51.5489 2.92705Z" fill="#F2C37B"/>
                        <path d="M73.5489 2.92705C73.8483 2.00574 75.1517 2.00574 75.4511 2.92705L76.1839 5.18237C76.3177 5.5944 76.7017 5.87336 77.1349 5.87336L79.5063 5.87336C80.475 5.87336 80.8778 7.11297 80.0941 7.68237L78.1756 9.07624C77.8251 9.33088 77.6784 9.78225 77.8123 10.1943L78.5451 12.4496C78.8445 13.3709 77.79 14.137 77.0063 13.5676L75.0878 12.1738C74.7373 11.9191 74.2627 11.9191 73.9122 12.1738L71.9937 13.5676C71.21 14.137 70.1555 13.3709 70.4549 12.4496L71.1877 10.1943C71.3216 9.78225 71.1749 9.33088 70.8244 9.07624L68.9059 7.68237C68.1222 7.11297 68.525 5.87336 69.4937 5.87336L71.8651 5.87336C72.2983 5.87336 72.6823 5.5944 72.8161 5.18237L73.5489 2.92705Z" fill="#F2C37B"/>
                        <path d="M95.5489 2.92705C95.8483 2.00574 97.1517 2.00574 97.4511 2.92705L98.1839 5.18237C98.3177 5.5944 98.7017 5.87336 99.1349 5.87336L101.506 5.87336C102.475 5.87336 102.878 7.11297 102.094 7.68237L100.176 9.07624C99.8251 9.33088 99.6784 9.78225 99.8123 10.1943L100.545 12.4496C100.844 13.3709 99.79 14.137 99.0063 13.5676L97.0878 12.1738C96.7373 11.9191 96.2627 11.9191 95.9122 12.1738L93.9937 13.5676C93.21 14.137 92.1555 13.3709 92.4549 12.4496L93.1877 10.1943C93.3216 9.78225 93.1749 9.33088 92.8244 9.07624L90.9059 7.68237C90.1222 7.11297 90.525 5.87336 91.4937 5.87336L93.8651 5.87336C94.2983 5.87336 94.6823 5.5944 94.8161 5.18237L95.5489 2.92705Z" fill="#F2C37B"/>
                    </svg>
                </div>
            </div> -->
        </div>
        <div>
            <div class="gray">Email</div>
            <div>{{ guide.email || guide.company_email }}</div>
        </div>
        <div>
            <div class="gray">Phone number</div>
            <div>{{ guide.phone_number }}</div>
        </div>
        <div v-if="guide.bio" class="flx column gap-4">
            <div class="gray">Guide Bio</div>
            <div>
                {{ guide.bio }}
            </div>
        </div>
        <div v-if="computedInsurance.length">
            <div class="gray">Guide Insurance</div>
            <div>
                <a class="a-link flx gap-4 ai-c" v-for="insurance in computedInsurance" :key="insurance.id" :href="s3bucket+'/'+insurance.url" target="_blank" onclick="return !window.open(this.href, 'Guide Insurance', 'width=700,height=800');">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.5 19.5">
                        <path d="M19.53,9.44l-7-7A.79.79,0,0,0,12,2.25H9A4.75,4.75,0,0,0,4.25,7V17A4.75,4.75,0,0,0,9,21.75h6A4.75,4.75,0,0,0,19.75,17V10A.79.79,0,0,0,19.53,9.44ZM12.75,4.79l4.46,4.46H14A1.25,1.25,0,0,1,12.75,8ZM5.75,17A3.26,3.26,0,0,0,9,20.25h6A3.26,3.26,0,0,0,18.25,17V10.75H14A2.75,2.75,0,0,1,11.25,8V3.75H9A3.26,3.26,0,0,0,5.75,7Z" transform="translate(-4.25 -2.25)" fill-rule="evenodd"/>
                    </svg>
                    {{ insurance.key }}
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                    </svg>
                </a>
            </div>
        </div>
        <div v-if="computedCertificate.length">
            <div class="gray">Guide Certificates</div>
            <div>
                <a class="a-link flx gap-4 ai-c" v-for="certificate in computedCertificate" :key="certificate.id" :href="s3bucket+'/'+certificate.url" target="_blank" onclick="return !window.open(this.href, 'Guide Certificates', 'width=700,height=800');">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.5 19.5">
                        <path d="M19.53,9.44l-7-7A.79.79,0,0,0,12,2.25H9A4.75,4.75,0,0,0,4.25,7V17A4.75,4.75,0,0,0,9,21.75h6A4.75,4.75,0,0,0,19.75,17V10A.79.79,0,0,0,19.53,9.44ZM12.75,4.79l4.46,4.46H14A1.25,1.25,0,0,1,12.75,8ZM5.75,17A3.26,3.26,0,0,0,9,20.25h6A3.26,3.26,0,0,0,18.25,17V10.75H14A2.75,2.75,0,0,1,11.25,8V3.75H9A3.26,3.26,0,0,0,5.75,7Z" transform="translate(-4.25 -2.25)" fill-rule="evenodd"/>
                    </svg>
                    {{ certificate.key }}
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                    </svg>
                </a>
            </div>
        </div>
        <div v-if="guide.guide_terms" class="flx column gap-4">
            <div class="gray">Guide Terms & Conditions</div>
            <div>
                <a class="a-link flx gap-4 ai-c" :href="s3bucket+'/'+JSON.parse(guide.guide_terms).url" target="_blank" onclick="return !window.open(this.href, 'Terms & Conditions', 'width=700,height=800');">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.5 19.5">
                        <path d="M19.53,9.44l-7-7A.79.79,0,0,0,12,2.25H9A4.75,4.75,0,0,0,4.25,7V17A4.75,4.75,0,0,0,9,21.75h6A4.75,4.75,0,0,0,19.75,17V10A.79.79,0,0,0,19.53,9.44ZM12.75,4.79l4.46,4.46H14A1.25,1.25,0,0,1,12.75,8ZM5.75,17A3.26,3.26,0,0,0,9,20.25h6A3.26,3.26,0,0,0,18.25,17V10.75H14A2.75,2.75,0,0,1,11.25,8V3.75H9A3.26,3.26,0,0,0,5.75,7Z" transform="translate(-4.25 -2.25)" fill-rule="evenodd"/>
                    </svg>
                    {{ JSON.parse(guide.guide_terms).key }}
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                    </svg>
                </a>
            </div>
        </div>
        <div v-if="guide.guide_terms" class="flx column gap-4">
            <div class="gray">Awards</div>
            <div class="flx gap-4">
                <li v-for="award in JSON.parse(guide.guide_awards)" :key="award.id" >
                    {{ award }}
                </li>
            </div>
        </div>
        <div v-if="guide.customer_reviews" class="flx column gap-4">
            <div class="gray">Link to review</div>
            <div>
                <a class="a-link flx gap-4 ai-c" :href="guide.customer_reviews" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="16" viewBox="0 0 12.63 17.542">
                        <path d="M-3596.535-398.6c-2.849-.757-3.132-2.13-1.605-7.782s2.465-6.7,5.313-5.943c2.729.725,3.1,2.016,1.789,7.093a.714.714,0,0,1-.874.506.717.717,0,0,1-.51-.872c.278-1.073.471-1.941.58-2.652a5.2,5.2,0,0,0,.057-1.734.75.75,0,0,0-.274-.5,3.151,3.151,0,0,0-1.137-.473,3.167,3.167,0,0,0-1.223-.154.759.759,0,0,0-.487.294,5.2,5.2,0,0,0-.825,1.529,32.248,32.248,0,0,0-1.025,3.27,32.009,32.009,0,0,0-.76,3.34,5.163,5.163,0,0,0-.057,1.734.746.746,0,0,0,.273.5,3.156,3.156,0,0,0,1.137.473,3.17,3.17,0,0,0,1.224.154.757.757,0,0,0,.486-.294,2.286,2.286,0,0,0,.19-.247.8.8,0,0,1,.855-.353l.023.006a.654.654,0,0,1,.425.963,2.4,2.4,0,0,1-2.183,1.359A5.506,5.506,0,0,1-3596.535-398.6Zm3.88-3.382c-2.729-.725-3.1-2.016-1.789-7.092a.715.715,0,0,1,.875-.507.716.716,0,0,1,.51.872c-.278,1.073-.47,1.941-.579,2.652a5.163,5.163,0,0,0-.057,1.734.742.742,0,0,0,.274.5,3.137,3.137,0,0,0,1.136.473,3.171,3.171,0,0,0,1.224.154.756.756,0,0,0,.486-.294,5.189,5.189,0,0,0,.825-1.529,32.169,32.169,0,0,0,1.024-3.27,32.2,32.2,0,0,0,.761-3.34,5.19,5.19,0,0,0,.057-1.734.749.749,0,0,0-.274-.5,3.151,3.151,0,0,0-1.137-.473,3.168,3.168,0,0,0-1.223-.154.76.76,0,0,0-.487.294,2.307,2.307,0,0,0-.19.248.8.8,0,0,1-.855.352l-.024-.006a.654.654,0,0,1-.425-.963c.867-1.4,1.885-1.591,3.574-1.142,2.849.757,3.133,2.131,1.606,7.782-1.247,4.615-2.1,6.161-3.923,6.16A5.513,5.513,0,0,1-3592.655-401.98Z" transform="translate(3599.056 415.923)" fill="#212135"/>
                    </svg>
                    {{ guide.customer_reviews }}
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                    </svg>
                </a>
            </div>
        </div>
        <div v-if="guide.guide_experience" class="flx column gap-4">
            <div class="gray">Experiences</div>
            <div>
                <div v-for="experience in JSON.parse(guide.guide_experience)" :key="experience.id">
                    <div v-if="experience.value > 0">{{experience.value}} years in {{ experience.name }}</div>
                </div>
            </div>
        </div>
        <div v-if="guide.referees" class="flx column gap-4">
            <div class="gray">Reference details</div>
            <div>
                <div v-for="referee in JSON.parse(guide.referees)" :key="referee.id" class="flx gap-8 flx-wrap">
                    <div class="flx gap-4">
                        <span class="gray">name:</span>
                        <span>{{ referee.name }}</span>
                    </div>
                    <div class="flx gap-4">
                        <span class="gray">Email:</span>
                        <span>{{ referee.email }}</span>
                    </div>
                    <div class="flx gap-4">
                        <span class="gray">Phone:</span>
                        <span>{{ referee.phone }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <send-message-button /> -->
    </div>
</template>

<script>
// import SendMessageButton from '@/components/includes/SendMessageButton.vue'
import { mapState, mapGetters } from 'vuex'
export default {
    // components: { SendMessageButton },
    name: 'GuideDetails',
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar
        }),
        computedCertificate() {
            if(this.guide.guide_certificate && Array.isArray(JSON.parse(this.guide.guide_certificate))) {
                return JSON.parse(this.guide.guide_certificate)
            }
            else
            return []
        },
        computedInsurance() {
            if(this.guide.guide_insurance && Array.isArray(JSON.parse(this.guide.guide_insurance))) {
                return JSON.parse(this.guide.guide_insurance)
            }
            else
            return []
        },

    },
    props: {
        guide: Object
    },
    mounted() {
        this.getDevice == 'mobile' ? document.body.classList.add('fixed-body') : ''
    },
    unmounted() {
        document.body.classList.remove('fixed-body')
    }
}
</script>

<style lang="scss" scoped>
</style>