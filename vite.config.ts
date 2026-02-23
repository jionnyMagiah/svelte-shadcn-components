import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { exec } from 'node:child_process';

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit(),
        {
            name: 'watch-velite',
            configureServer(server) {
                server.watcher.on('change', (file) => {
                    if (file.endsWith('.md')) {
                        // change your condition
                        exec('pnpm velite', (err, stdout, stderr) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            console.log(stdout);
                            if (stderr) console.error(stderr);
                        });
                    }
                });
            }
        },
        {
            name: 'watch-examples',
            configureServer(server) {
                server.watcher.on('change', (file) => {
                    if (file.includes('src/lib/code-preview/snippet')) {
                        // change your condition
                        exec(
                            'node ./scripts/build-code-preview-data.js',
                            (err, stdout, stderr) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                console.log(stdout);
                                if (stderr) console.error(stderr);
                            }
                        );
                    }
                });
            }
        }
    ],
    server: {
        fs: {
            allow: [resolve(__dirname, './.velite')]
        }
    }
});
