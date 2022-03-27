export function buildFlags(options) {
    const flags = [];
    if (options.allow) {
        if (Array.isArray(options.allow)) {
            options.allow.forEach((flag) => flags.push(`--allow-${flag}`));
        }
        else if (options.allow === "all") {
            flags.push(`--allow-all`);
        }
        else if (typeof options.allow === "object") {
            Object.entries(options.allow).map(([flag, value]) => {
                if (!value || (typeof value === "boolean" && value)) {
                    flags.push(`--allow-${flag}`);
                }
                else {
                    flags.push(`--allow-${flag}=${value}`);
                }
            });
        }
    }
    if (options.importMap) {
        flags.push("--import-map");
        flags.push(options.importMap);
    }
    if (options.lock) {
        flags.push("--lock");
        flags.push(options.lock);
    }
    if (options.log) {
        flags.push("--log-level");
        flags.push(options.log);
    }
    if (options.tsconfig) {
        flags.push("--config");
        flags.push(options.tsconfig);
    }
    if (options.cert) {
        flags.push("--cert");
        flags.push(options.cert);
    }
    if (options.inspect) {
        flags.push(`--inspect=${options.inspect}`);
    }
    if (options.inspectBrk) {
        flags.push(`--inspect-brk=${options.inspectBrk}`);
    }
    if (options.noCheck) {
        flags.push("--no-check");
    }
    if (options.unstable) {
        flags.push("--unstable");
    }
    return flags;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvZGVub25AMi41LjAvc3JjL3NjcmlwdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUdBLE1BQU0sVUFBVSxVQUFVLENBQUMsT0FBc0I7SUFDL0MsTUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtRQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO2FBQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtZQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzNCO2FBQU0sSUFBSSxPQUFPLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ3hDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDL0I7SUFDRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7UUFDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtJQUNELElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNmLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7SUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM5QjtJQUNELElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtRQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCO0lBQ0QsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUM1QztJQUNELElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtRQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztLQUNuRDtJQUNELElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzFCO0lBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDMUI7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIHRoZSBkZW5vc2F1cnMgdGVhbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG5cbi8qKiBNYXAgb2YgZGVjbGFyZWQgc2NyaXB0cyxcbiAqIFVzZWQgYnkgYFJ1bm5lcmAuICovXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdHMge1xuICBba2V5OiBzdHJpbmddOiBTY3JpcHQ7XG59XG5cbi8qKiBBIHJ1bm5hYmxlIHNjcmlwdC5cbiAqIENhbiBiZSBhcyBzaW1wbGUgYXMgYSBzdHJpbmc6XG4gKiBgYGBqc29uXG4gKiB7XG4gKiAgIFwic3RhcnRcIjogXCJkZW5vIHJ1biBhcHAudHNcIlxuICogfVxuICogYGBgXG4gKiBvciBhcyBhIGNvbXBsZXggYFNjcmlwdE9iamVjdGA6XG4gKiBgYGBqc29uXG4gKiB7XG4gKiAgIFwic3RhcnRcIjoge1xuICogICAgICBcImNtZFwiOiBcImRlbm8gcnVuIGFwcC50c1wiLFxuICogICAgICBcImRlc2NcIjogXCJydW4gbWFpbiBhcHBsaWNhdGlvblwiLFxuICogICAgICBcImFsbG93XCI6IFsgXCJlbnZcIiwgXCJyZWFkXCIgXVxuICogICB9XG4gKiB9XG4gKiBgYGAgKi9cbmV4cG9ydCB0eXBlIFNjcmlwdCA9IHN0cmluZyB8IFNjcmlwdE9iamVjdCB8IFNjcmlwdEFycmF5O1xuXG4vKiogQSBjb2xsZWN0aW9uIG9mIHJ1bm5hYmxlIHNjcmlwdHMuXG4gKiBTZWUgU2NyaXB0ICovXG5leHBvcnQgdHlwZSBTY3JpcHRBcnJheSA9IChzdHJpbmcgfCBTY3JpcHRPYmplY3QpW107XG5cbi8qKiBNb3N0IGNvbXBsZXRlIHJlcHJlc2VudGF0aW9uIG9mIGEgc2NyaXB0LiBDYW5cbiAqIGJlIGNvbmZpZ3VyZWQgaW4gZGV0YWlscyBhcyBpdCBleHRlbmRzIGBTY3JpcHRPcHRpb25zYFxuICogYW5kIGNhbiBhbHNvIGNvbnRhaW4gYSBgZGVzY2AgdGhhdCBpcyBkaXNwbGF5ZWQgYWxvbmdcbiAqIHNjcmlwdCBuYW1lIHdoZW5gZGVub25gIGlzIHJ1biB3aXRob3V0IGFueSBhcmd1bWVudHMgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBTY3JpcHRPYmplY3QgZXh0ZW5kcyBTY3JpcHRPcHRpb25zIHtcbiAgY21kOiBzdHJpbmc7XG4gIGRlc2M/OiBzdHJpbmc7XG59XG5cbi8qKiBEZW5vIENMSSBmbGFncyBpbiBhIG1hcC5cbiAqIGB7IGFsbG93OiB7IFwid3JpdGVcIjogXCIvdG1wXCIsIFwicmVhZFwiOiBcIi90bXBcIiB9fWBcbiAqIC0+IGBbLS1hbGxvdy13cml0ZT0vdG1wLCAtLWFsbG93LXJlYWQ9L3RtcF1gICovXG5leHBvcnQgaW50ZXJmYWNlIEZsYWdzT2JqZWN0IHtcbiAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbn1cblxuLyoqIEVudmlyb25tZW50IHZhcmlhYmxlcyBpbiBhIG1hcC5cbiAqIGB7IFRPS0VOOiBcIlNFQ1JFVCFcIiB9YFxuICogLT4gYFRPS0VOPVNFQ1JFVGAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW52aXJvbm1lbnRWYXJpYWJsZXMge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbi8qKiBBZGRpdGlvbmFsIHNjcmlwdCBvcHRpb25zLlxuICpcbiAqIFRoZXNlIGNhbiBiZSBhcHBsaWVkIGJvdGggaW4gYFNjcmlwdE9iamVjdGBzIGFuZCBhdCB0b3AtbGV2ZWxcbiAqIGluIHdoaWNoIGNhc2UgdGhleSdyZSBhcHBsaWVkIHRvIGFsbCB0aGUgc2NyaXB0cyBkZWZpbmVkIGluIHRoZSBmaWxlICovXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdE9wdGlvbnMge1xuICAvKiogQSBtYXAgb2YgZW52aXJvbm1lbnQgdmFyaWFibGVzIHRvIGJlIHBhc3NlZCB0byB0aGUgc2NyaXB0ICovXG4gIGVudj86IEVudmlyb25tZW50VmFyaWFibGVzO1xuICAvKiogQSBsaXN0IG9mIGJvb2xlYW4gYC0tYWxsb3ctKmAgZGVubyBjbGkgb3B0aW9ucyBvclxuICAgKiBhIG1hcCBvZiBvcHRpb24gbmFtZXMgdG8gdmFsdWVzICovXG4gIGFsbG93Pzogc3RyaW5nW10gfCBGbGFnc09iamVjdCB8IFwiYWxsXCI7XG4gIC8qKiBUaGUgcGF0aCB0byBhbiBpbXBvcnQgbWFwIGpzb24gZmlsZSxcbiAgICogcGFzc2VkIHRvIGRlbm8gY2xpJ3MgYC0taW1wb3J0LW1hcGAgb3B0aW9uLlxuICAgKlxuICAgKiAqKk5vdGUqKiBUaGlzIGN1cnJlbnRseSByZXF1aXJlcyB0aGUgYC0tdW5zdGFibGVgIGZsYWcgKi9cbiAgaW1wb3J0TWFwPzogc3RyaW5nO1xuICAvKiogVGhlIHBhdGggdG8gYSB0c2NvbmZpZyBqc29uIGZpbGUsXG4gICAqIHBhc3NlZCB0byBkZW5vIGNsaSdzIGAtLXRzY29uZmlnYCBvcHRpb24uICovXG4gIHRzY29uZmlnPzogc3RyaW5nO1xuICAvKiogSWYgdGhlIGNvZGUgdGhhdCBoYXMgdG8gYmUgcnVuIGlzIHVzaW5nIHVuc3RhYmxlIGZlYXR1cmVzXG4gICAqIGZyb20gZGVubyBzdGFuZGFyZCBsaWJyYXJ5IHRoaXMgb3B0aW9uIHNob3VsZCBiZSBzZXQgdG9cbiAgICogYHRydWVgIHNvIHRoYXQgYC0tdW5zdGFibGVgIG9wdGlvbiBpcyBwYXNzZWQgdG8gZGVubyBjbGkncy4gKi9cbiAgdW5zdGFibGU/OiBib29sZWFuO1xuICAvKiogU2tpcCBUeXBlc2NyaXB0IHR5cGUgY2hlY2tpbmcgbW9kdWxlICovXG4gIG5vQ2hlY2s/OiBib29sZWFuO1xuICAvKiogVGhlIGhvc3RuYW1lIGFuZCBwb3J0IHdoZXJlIHRvIHN0YXJ0IHRoZSBpbnNwZWN0b3IsXG4gICAqIHBhc3NlZCB0byBkZW5vIGNsaSdzIGAtLWluc3BlY3RgIG9wdGlvbi4gKi9cbiAgaW5zcGVjdD86IHN0cmluZztcbiAgLyoqIFNhbWUgYXMgYGluc3BlY3RgLCBidXQgYnJlYWtzIGF0IHN0YXJ0IG9mIHVzZXIgc2NyaXB0LiAqL1xuICBpbnNwZWN0QnJrPzogc3RyaW5nO1xuICAvKiogVGhlIHBhdGggdG8gYW4gX2V4aXN0aW5nXyBsb2NrZmlsZSxcbiAgICogcGFzc2VkIHRvIGRlbm8gY2xpJ3MgYC0tbG9ja2Agb3B0aW9uLlxuICAgKlxuICAgKiAqKk5vdGUqKiBUaGlzIGRvZXNuJ3QgY3JlYXRlIHRoZSBsb2NrZmlsZSwgdXNlIGAtLWxvY2std3JpdGVgIG1hbnVhbGx5XG4gICAqIHdoZW4gYXBwcm9wcmlhdGUgKi9cbiAgbG9jaz86IHN0cmluZztcbiAgLyoqIFRoZSBwYXRoIHRvIGEgUEVNIGNlcnRpZmljYXRlIGZpbGUsXG4gICAqIHBhc3NlZCB0byBkZW5vIGNsaSdzIGAtLWNlcnRgIG9wdGlvbi4gKi9cbiAgY2VydD86IHN0cmluZztcbiAgLyoqIFRoZSBsb2cgbGV2ZWwsIHBhc3NlZCB0byBkZW5vIGNsaSdzIGAtLWxvZy1sZXZlbGAgb3B0aW9uLiAqL1xuICBsb2c/OiBzdHJpbmc7XG4gIC8qKiBTaG91bGQgd2F0Y2guIEVuYWJsZWQgYnkgZGVmYXVsdC4gVG9nZ2xlIGZpbGUgd2F0Y2hpbmdcbiAgICogZm9yIHBhcnRpY3VsYXIgc2NyaXB0LiAqL1xuICB3YXRjaD86IGJvb2xlYW47XG4gIC8qKiBTdGFuZGFyZCBpL28vZXJyLCB0byBiZSBwYXNzZWQgZGlyZWN0bHkgdG8gRGVuby5ydW4uICovXG4gIHN0ZGluPzogXCJpbmhlcml0XCIgfCBcInBpcGVkXCIgfCBcIm51bGxcIiB8IG51bWJlcjtcbiAgc3Rkb3V0PzogXCJpbmhlcml0XCIgfCBcInBpcGVkXCIgfCBcIm51bGxcIiB8IG51bWJlcjtcbiAgc3RkZXJyPzogXCJpbmhlcml0XCIgfCBcInBpcGVkXCIgfCBcIm51bGxcIiB8IG51bWJlcjtcbn1cblxuLyoqIEJ1aWxkIGRlbm8gZmxhZ3MgZnJvbSBTY3JpcHRPcHRpb25zLlxuICogYHsgYWxsb3c6IFsgcnVuLCBlbnYgXX1gIC0+IGBbLS1hbGxvdy1ydW4sIC0tYWxsb3ctZW52XWAgKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEZsYWdzKG9wdGlvbnM6IFNjcmlwdE9wdGlvbnMpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGZsYWdzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAob3B0aW9ucy5hbGxvdykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuYWxsb3cpKSB7XG4gICAgICBvcHRpb25zLmFsbG93LmZvckVhY2goKGZsYWcpID0+IGZsYWdzLnB1c2goYC0tYWxsb3ctJHtmbGFnfWApKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuYWxsb3cgPT09IFwiYWxsXCIpIHtcbiAgICAgIGZsYWdzLnB1c2goYC0tYWxsb3ctYWxsYCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5hbGxvdyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgT2JqZWN0LmVudHJpZXMob3B0aW9ucy5hbGxvdykubWFwKChbZmxhZywgdmFsdWVdKSA9PiB7XG4gICAgICAgIGlmICghdmFsdWUgfHwgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgJiYgdmFsdWUpKSB7XG4gICAgICAgICAgZmxhZ3MucHVzaChgLS1hbGxvdy0ke2ZsYWd9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmxhZ3MucHVzaChgLS1hbGxvdy0ke2ZsYWd9PSR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBpZiAob3B0aW9ucy5pbXBvcnRNYXApIHtcbiAgICBmbGFncy5wdXNoKFwiLS1pbXBvcnQtbWFwXCIpO1xuICAgIGZsYWdzLnB1c2gob3B0aW9ucy5pbXBvcnRNYXApO1xuICB9XG4gIGlmIChvcHRpb25zLmxvY2spIHtcbiAgICBmbGFncy5wdXNoKFwiLS1sb2NrXCIpO1xuICAgIGZsYWdzLnB1c2gob3B0aW9ucy5sb2NrKTtcbiAgfVxuICBpZiAob3B0aW9ucy5sb2cpIHtcbiAgICBmbGFncy5wdXNoKFwiLS1sb2ctbGV2ZWxcIik7XG4gICAgZmxhZ3MucHVzaChvcHRpb25zLmxvZyk7XG4gIH1cbiAgaWYgKG9wdGlvbnMudHNjb25maWcpIHtcbiAgICBmbGFncy5wdXNoKFwiLS1jb25maWdcIik7XG4gICAgZmxhZ3MucHVzaChvcHRpb25zLnRzY29uZmlnKTtcbiAgfVxuICBpZiAob3B0aW9ucy5jZXJ0KSB7XG4gICAgZmxhZ3MucHVzaChcIi0tY2VydFwiKTtcbiAgICBmbGFncy5wdXNoKG9wdGlvbnMuY2VydCk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaW5zcGVjdCkge1xuICAgIGZsYWdzLnB1c2goYC0taW5zcGVjdD0ke29wdGlvbnMuaW5zcGVjdH1gKTtcbiAgfVxuICBpZiAob3B0aW9ucy5pbnNwZWN0QnJrKSB7XG4gICAgZmxhZ3MucHVzaChgLS1pbnNwZWN0LWJyaz0ke29wdGlvbnMuaW5zcGVjdEJya31gKTtcbiAgfVxuICBpZiAob3B0aW9ucy5ub0NoZWNrKSB7XG4gICAgZmxhZ3MucHVzaChcIi0tbm8tY2hlY2tcIik7XG4gIH1cbiAgaWYgKG9wdGlvbnMudW5zdGFibGUpIHtcbiAgICBmbGFncy5wdXNoKFwiLS11bnN0YWJsZVwiKTtcbiAgfVxuICByZXR1cm4gZmxhZ3M7XG59XG4iXX0=