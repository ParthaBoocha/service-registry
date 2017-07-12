using System;
using System.Diagnostics;
using System.Threading;
using Machine.Specifications;

namespace service_registry_tests
{
    public class DebuggerHook : IAssemblyContext
    {
        public void OnAssemblyComplete()
        {
            //Do Nothing
        }

        public void OnAssemblyStart()
        {
            //Uncomment following to pause to attach debugger from VS code
            // while(!Debugger.IsAttached) Thread.Sleep(250);
        }
    }
}