import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faThreads, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
      return (
            <footer className="w-full p-1 bg-gray-900 flex flex-col-reverse justify-center gap-4 sm:flex-row">
                  <div className="w-1/3 text-slate-300">
                  <p>@ Kunal Das</p>
                  <p>Computer Science and Engineering (2022-26) </p>
                  </div>
                  
                  <div className="w-2/3 flex  align-middle items-center justify-evenly text-white">
                  <a className="" href="https://github.com/Kunal25Das" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                  </a>
                  <a href="https://x.com/_hit0ru_" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </a>
                        {/* Threads Link */}
                        <a href="https://www.threads.net/@_.hitoru._" target="_blank" rel="noopener noreferrer">
                              <FontAwesomeIcon icon={faThreads} size="2x" />
                        </a>

                        {/* Instagram Link */}
                        <a href="https://www.instagram.com/_.hitoru._/" target="_blank" rel="noopener noreferrer">
                              <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>

                  </div>
            </footer>
      );
}
