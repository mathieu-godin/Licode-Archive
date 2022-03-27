import { createHttpError } from "./httpError.ts";
import { Cookies } from "./cookies.ts";
import { Response } from "./response.ts";
import { preferredMediaTypes } from "./negotiation/mediaType.ts";
export function createMockApp(state = {}) {
    const app = {
        state,
        use() {
            return app;
        },
        [Symbol.for("Deno.customInspect")]() {
            return "MockApplication {}";
        },
        [Symbol.for("nodejs.util.inspect.custom")](depth, options, inspect) {
            if (depth < 0) {
                return options.stylize(`[MockApplication]`, "special");
            }
            const newOptions = Object.assign({}, options, {
                depth: options.depth === null ? null : options.depth - 1,
            });
            return `${options.stylize("MockApplication", "special")} ${inspect({}, newOptions)}`;
        },
    };
    return app;
}
export const mockContextState = {
    encodingsAccepted: "identity",
};
export function createMockContext({ ip = "127.0.0.1", method = "GET", params, path = "/", state, app = createMockApp(state), headers, } = {}) {
    function createMockRequest() {
        const headerMap = new Headers(headers);
        return {
            accepts(...types) {
                const acceptValue = headerMap.get("Accept");
                if (!acceptValue) {
                    return;
                }
                if (types.length) {
                    return preferredMediaTypes(acceptValue, types)[0];
                }
                return preferredMediaTypes(acceptValue);
            },
            acceptsEncodings() {
                return mockContextState.encodingsAccepted;
            },
            headers: headerMap,
            ip,
            method,
            path,
            search: undefined,
            searchParams: new URLSearchParams(),
            url: new URL(path, "http://localhost/"),
        };
    }
    const request = createMockRequest();
    const response = new Response(request);
    const cookies = new Cookies(request, response);
    return {
        app,
        params,
        request,
        cookies,
        response,
        state: Object.assign({}, app.state),
        assert(condition, errorStatus = 500, message, props) {
            if (condition) {
                return;
            }
            const err = createHttpError(errorStatus, message);
            if (props) {
                Object.assign(err, props);
            }
            throw err;
        },
        throw(errorStatus, message, props) {
            const err = createHttpError(errorStatus, message);
            if (props) {
                Object.assign(err, props);
            }
            throw err;
        },
        [Symbol.for("Deno.customInspect")]() {
            return `MockContext {}`;
        },
        [Symbol.for("nodejs.util.inspect.custom")](depth, options, inspect) {
            if (depth < 0) {
                return options.stylize(`[MockContext]`, "special");
            }
            const newOptions = Object.assign({}, options, {
                depth: options.depth === null ? null : options.depth - 1,
            });
            return `${options.stylize("MockContext", "special")} ${inspect({}, newOptions)}`;
        },
    };
}
export function createMockNext() {
    return async function next() { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUdqRSxNQUFNLFVBQVUsYUFBYSxDQUczQixRQUFRLEVBQU87SUFFZixNQUFNLEdBQUcsR0FBRztRQUNWLEtBQUs7UUFDTCxHQUFHO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0QsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDaEMsT0FBTyxvQkFBb0IsQ0FBQztRQUM5QixDQUFDO1FBQ0QsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FDeEMsS0FBYSxFQUNiLE9BQVksRUFDWixPQUFzRDtZQUV0RCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3hEO1lBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO2dCQUM1QyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDO2FBQ3pELENBQUMsQ0FBQztZQUNILE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxJQUNyRCxPQUFPLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FDeEIs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LEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNwRDtZQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtnQkFDNUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQzthQUN6RCxDQUFDLENBQUM7WUFDSCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLElBQ2pELE9BQU8sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUN4QixFQUFFLENBQUM7UUFDTCxDQUFDO0tBQ29DLENBQUM7QUFDMUMsQ0FBQztBQUlELE1BQU0sVUFBVSxjQUFjO0lBQzVCLE9BQU8sS0FBSyxVQUFVLElBQUksS0FBSSxDQUFDLENBQUM7QUFDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIG9hayBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cblxuLy8gZGVuby1saW50LWlnbm9yZS1maWxlIG5vLWV4cGxpY2l0LWFueVxuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiB1dGlsaXR5IEFQSXMgd2hpY2ggY2FuIG1ha2UgdGVzdGluZyBvZiBhbiBvYWsgYXBwbGljYXRpb25cbiAqIGVhc2llci5cbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBBcHBsaWNhdGlvbiwgU3RhdGUgfSBmcm9tIFwiLi9hcHBsaWNhdGlvbi50c1wiO1xuaW1wb3J0IHsgY3JlYXRlSHR0cEVycm9yIH0gZnJvbSBcIi4vaHR0cEVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFJvdXRlUGFyYW1zLCBSb3V0ZXJDb250ZXh0IH0gZnJvbSBcIi4vcm91dGVyLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEVycm9yU3RhdHVzIH0gZnJvbSBcIi4vdHlwZXMuZC50c1wiO1xuaW1wb3J0IHsgQ29va2llcyB9IGZyb20gXCIuL2Nvb2tpZXMudHNcIjtcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tIFwiLi9yZXF1ZXN0LnRzXCI7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gXCIuL3Jlc3BvbnNlLnRzXCI7XG5pbXBvcnQgeyBwcmVmZXJyZWRNZWRpYVR5cGVzIH0gZnJvbSBcIi4vbmVnb3RpYXRpb24vbWVkaWFUeXBlLnRzXCI7XG5cbi8qKiBDcmVhdGVzIGEgbW9jayBvZiBgQXBwbGljYXRpb25gLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vY2tBcHA8XG4gIFMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nIHwgbnVtYmVyIHwgc3ltYm9sLCBhbnk+ID0gUmVjb3JkPHN0cmluZywgYW55Pixcbj4oXG4gIHN0YXRlID0ge30gYXMgUyxcbik6IEFwcGxpY2F0aW9uPFM+IHtcbiAgY29uc3QgYXBwID0ge1xuICAgIHN0YXRlLFxuICAgIHVzZSgpIHtcbiAgICAgIHJldHVybiBhcHA7XG4gICAgfSxcbiAgICBbU3ltYm9sLmZvcihcIkRlbm8uY3VzdG9tSW5zcGVjdFwiKV0oKSB7XG4gICAgICByZXR1cm4gXCJNb2NrQXBwbGljYXRpb24ge31cIjtcbiAgICB9LFxuICAgIFtTeW1ib2wuZm9yKFwibm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b21cIildKFxuICAgICAgZGVwdGg6IG51bWJlcixcbiAgICAgIG9wdGlvbnM6IGFueSxcbiAgICAgIGluc3BlY3Q6ICh2YWx1ZTogdW5rbm93biwgb3B0aW9ucz86IHVua25vd24pID0+IHN0cmluZyxcbiAgICApIHtcbiAgICAgIGlmIChkZXB0aCA8IDApIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShgW01vY2tBcHBsaWNhdGlvbl1gLCBcInNwZWNpYWxcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgIGRlcHRoOiBvcHRpb25zLmRlcHRoID09PSBudWxsID8gbnVsbCA6IG9wdGlvbnMuZGVwdGggLSAxLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gYCR7b3B0aW9ucy5zdHlsaXplKFwiTW9ja0FwcGxpY2F0aW9uXCIsIFwic3BlY2lhbFwiKX0gJHtcbiAgICAgICAgaW5zcGVjdCh7fSwgbmV3T3B0aW9ucylcbiAgICAgIH1gO1xuICAgIH0sXG4gIH0gYXMgYW55O1xuICByZXR1cm4gYXBwO1xufVxuXG4vKiogT3B0aW9ucyB0aGF0IGNhbiBiZSBzZXQgaW4gYSBtb2NrIGNvbnRleHQuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tDb250ZXh0T3B0aW9uczxcbiAgUiBleHRlbmRzIHN0cmluZyxcbiAgUCBleHRlbmRzIFJvdXRlUGFyYW1zPFI+ID0gUm91dGVQYXJhbXM8Uj4sXG4gIFMgZXh0ZW5kcyBTdGF0ZSA9IFJlY29yZDxzdHJpbmcsIGFueT4sXG4+IHtcbiAgYXBwPzogQXBwbGljYXRpb248Uz47XG4gIGlwPzogc3RyaW5nO1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIHBhcmFtcz86IFA7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIHN0YXRlPzogUztcbiAgaGVhZGVycz86IFtzdHJpbmcsIHN0cmluZ11bXTtcbn1cblxuLyoqIEFsbG93cyBleHRlcm5hbCBwYXJ0aWVzIHRvIG1vZGlmeSB0aGUgY29udGV4dCBzdGF0ZS4gKi9cbmV4cG9ydCBjb25zdCBtb2NrQ29udGV4dFN0YXRlID0ge1xuICAvKiogQWRqdXN0cyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBgYWNjZXB0ZWRFbmNvZGluZ3NgIGluIHRoZSBjb250ZXh0J3NcbiAgICogYHJlcXVlc3RgIG9iamVjdC4gKi9cbiAgZW5jb2RpbmdzQWNjZXB0ZWQ6IFwiaWRlbnRpdHlcIixcbn07XG5cbi8qKiBDcmVhdGUgYSBtb2NrIG9mIGBDb250ZXh0YCBvciBgUm91dGVyQ29udGV4dGAuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTW9ja0NvbnRleHQ8XG4gIFIgZXh0ZW5kcyBzdHJpbmcsXG4gIFAgZXh0ZW5kcyBSb3V0ZVBhcmFtczxSPiA9IFJvdXRlUGFyYW1zPFI+LFxuICBTIGV4dGVuZHMgU3RhdGUgPSBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuPihcbiAge1xuICAgIGlwID0gXCIxMjcuMC4wLjFcIixcbiAgICBtZXRob2QgPSBcIkdFVFwiLFxuICAgIHBhcmFtcyxcbiAgICBwYXRoID0gXCIvXCIsXG4gICAgc3RhdGUsXG4gICAgYXBwID0gY3JlYXRlTW9ja0FwcChzdGF0ZSksXG4gICAgaGVhZGVycyxcbiAgfTogTW9ja0NvbnRleHRPcHRpb25zPFI+ID0ge30sXG4pIHtcbiAgZnVuY3Rpb24gY3JlYXRlTW9ja1JlcXVlc3QoKTogUmVxdWVzdCB7XG4gICAgY29uc3QgaGVhZGVyTWFwID0gbmV3IEhlYWRlcnMoaGVhZGVycyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2VwdHMoLi4udHlwZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IGFjY2VwdFZhbHVlID0gaGVhZGVyTWFwLmdldChcIkFjY2VwdFwiKTtcbiAgICAgICAgaWYgKCFhY2NlcHRWYWx1ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHByZWZlcnJlZE1lZGlhVHlwZXMoYWNjZXB0VmFsdWUsIHR5cGVzKVswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJlZmVycmVkTWVkaWFUeXBlcyhhY2NlcHRWYWx1ZSk7XG4gICAgICB9LFxuICAgICAgYWNjZXB0c0VuY29kaW5ncygpIHtcbiAgICAgICAgcmV0dXJuIG1vY2tDb250ZXh0U3RhdGUuZW5jb2RpbmdzQWNjZXB0ZWQ7XG4gICAgICB9LFxuICAgICAgaGVhZGVyczogaGVhZGVyTWFwLFxuICAgICAgaXAsXG4gICAgICBtZXRob2QsXG4gICAgICBwYXRoLFxuICAgICAgc2VhcmNoOiB1bmRlZmluZWQsXG4gICAgICBzZWFyY2hQYXJhbXM6IG5ldyBVUkxTZWFyY2hQYXJhbXMoKSxcbiAgICAgIHVybDogbmV3IFVSTChwYXRoLCBcImh0dHA6Ly9sb2NhbGhvc3QvXCIpLFxuICAgIH0gYXMgYW55O1xuICB9XG5cbiAgY29uc3QgcmVxdWVzdCA9IGNyZWF0ZU1vY2tSZXF1ZXN0KCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKHJlcXVlc3QpO1xuICBjb25zdCBjb29raWVzID0gbmV3IENvb2tpZXMocmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIHJldHVybiAoe1xuICAgIGFwcCxcbiAgICBwYXJhbXMsXG4gICAgcmVxdWVzdCxcbiAgICBjb29raWVzLFxuICAgIHJlc3BvbnNlLFxuICAgIHN0YXRlOiBPYmplY3QuYXNzaWduKHt9LCBhcHAuc3RhdGUpLFxuICAgIGFzc2VydChcbiAgICAgIGNvbmRpdGlvbjogYW55LFxuICAgICAgZXJyb3JTdGF0dXM6IEVycm9yU3RhdHVzID0gNTAwLFxuICAgICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICAgIHByb3BzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgKTogYXNzZXJ0cyBjb25kaXRpb24ge1xuICAgICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBlcnIgPSBjcmVhdGVIdHRwRXJyb3IoZXJyb3JTdGF0dXMsIG1lc3NhZ2UpO1xuICAgICAgaWYgKHByb3BzKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBwcm9wcyk7XG4gICAgICB9XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSxcbiAgICB0aHJvdyhcbiAgICAgIGVycm9yU3RhdHVzOiBFcnJvclN0YXR1cyxcbiAgICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgICBwcm9wcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgICk6IG5ldmVyIHtcbiAgICAgIGNvbnN0IGVyciA9IGNyZWF0ZUh0dHBFcnJvcihlcnJvclN0YXR1cywgbWVzc2FnZSk7XG4gICAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIHByb3BzKTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycjtcbiAgICB9LFxuICAgIFtTeW1ib2wuZm9yKFwiRGVuby5jdXN0b21JbnNwZWN0XCIpXSgpIHtcbiAgICAgIHJldHVybiBgTW9ja0NvbnRleHQge31gO1xuICAgIH0sXG4gICAgW1N5bWJvbC5mb3IoXCJub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbVwiKV0oXG4gICAgICBkZXB0aDogbnVtYmVyLFxuICAgICAgb3B0aW9uczogYW55LFxuICAgICAgaW5zcGVjdDogKHZhbHVlOiB1bmtub3duLCBvcHRpb25zPzogdW5rbm93bikgPT4gc3RyaW5nLFxuICAgICkge1xuICAgICAgaWYgKGRlcHRoIDwgMCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKGBbTW9ja0NvbnRleHRdYCwgXCJzcGVjaWFsXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgICBkZXB0aDogb3B0aW9ucy5kZXB0aCA9PT0gbnVsbCA/IG51bGwgOiBvcHRpb25zLmRlcHRoIC0gMSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGAke29wdGlvbnMuc3R5bGl6ZShcIk1vY2tDb250ZXh0XCIsIFwic3BlY2lhbFwiKX0gJHtcbiAgICAgICAgaW5zcGVjdCh7fSwgbmV3T3B0aW9ucylcbiAgICAgIH1gO1xuICAgIH0sXG4gIH0gYXMgdW5rbm93bikgYXMgUm91dGVyQ29udGV4dDxSLCBQLCBTPjtcbn1cblxuLyoqIENyZWF0ZXMgYSBtb2NrIGBuZXh0KClgIGZ1bmN0aW9uIHdoaWNoIGNhbiBiZSB1c2VkIHdoZW4gY2FsbGluZ1xuICogbWlkZGxld2FyZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNb2NrTmV4dCgpIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIG5leHQoKSB7fTtcbn1cbiJdfQ==